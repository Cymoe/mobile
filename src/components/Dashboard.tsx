import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Platform } from 'react-native';
import { getInvoices } from '../utils/storage';
import { getClients } from '../utils/clientStorage';
import { getProducts } from '../utils/productStorage';
import { Invoice } from '../types/Invoice';

export function Dashboard({ navigation }: any) {
  const [revenueGoal, setRevenueGoal] = useState(50000);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalType, setGoalType] = useState<'fixed' | 'percentage'>('fixed');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentRevenue, setCurrentRevenue] = useState(0);

  const [metrics, setMetrics] = useState({
    totalInvoices: 0,
    pendingInvoices: 0,
    totalRevenue: 0,
    pendingRevenue: 0,
    totalClients: 0,
    totalProducts: 0,
    recentInvoices: [] as Invoice[],
  });

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    const [invoices, clients, products] = await Promise.all([
      getInvoices(),
      getClients(),
      getProducts(),
    ]);

    const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const pendingRevenue = pendingInvoices.reduce((sum, inv) => sum + inv.total, 0);
    const recentInvoices = [...invoices].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 5);

    setCurrentRevenue(totalRevenue);
    setMetrics({
      totalInvoices: invoices.length,
      pendingInvoices: pendingInvoices.length,
      totalRevenue,
      pendingRevenue,
      totalClients: clients.length,
      totalProducts: products.length,
      recentInvoices,
    });
  };

  const handleSetGoal = () => {
    const amount = Number(targetAmount);
    if (amount > 0) {
      if (goalType === 'percentage') {
        const increase = currentRevenue * (amount / 100);
        setRevenueGoal(currentRevenue + increase);
      } else {
        setRevenueGoal(amount);
      }
    }
    setShowGoalModal(false);
    setTargetAmount('');
  };

  const paidRevenue = metrics.totalRevenue - metrics.pendingRevenue;
  const paidPercentage = Math.min((paidRevenue / revenueGoal) * 100, 100);
  const pendingPercentage = Math.min((metrics.pendingRevenue / revenueGoal) * 100, 100);
  const totalPercentage = Math.min(((paidRevenue + metrics.pendingRevenue) / revenueGoal) * 100, 100);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressTitle}>Revenue Progress</Text>
            <Text style={styles.progressAmount}>
              ${metrics.totalRevenue.toLocaleString()} / ${revenueGoal.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.setGoalButton}
            onPress={() => setShowGoalModal(true)}
          >
            <Text style={styles.setGoalText}>Set Goal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${paidPercentage}%` }]} />
          <View style={[styles.pendingBar, { width: `${pendingPercentage}%`, left: `${paidPercentage}%` }]} />
        </View>

        <View style={styles.progressLegend}>
          <Text style={styles.progressPercentage}>
            {totalPercentage.toFixed(1)}% of goal
          </Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.paidDot]} />
              <Text style={styles.legendText}>Paid: ${paidRevenue.toLocaleString()}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.pendingDot]} />
              <Text style={styles.legendText}>Pending: ${metrics.pendingRevenue.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total Revenue</Text>
          <Text style={styles.metricValue}>
            ${metrics.totalRevenue.toLocaleString()}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Pending Revenue</Text>
          <Text style={[styles.metricValue, styles.pendingValue]}>
            ${metrics.pendingRevenue.toLocaleString()}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total Invoices</Text>
          <Text style={styles.metricValue}>{metrics.totalInvoices}</Text>
          <Text style={styles.metricSubtext}>
            {metrics.pendingInvoices} pending
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Active Clients</Text>
          <Text style={styles.metricValue}>{metrics.totalClients}</Text>
        </View>
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Invoices</Text>
        {metrics.recentInvoices.map((invoice) => (
          <TouchableOpacity
            key={invoice.id}
            style={styles.recentItem}
            onPress={() => navigation.navigate('InvoiceStack', {
              screen: 'InvoiceDetails',
              params: { invoice }
            })}
          >
            <View>
              <Text style={styles.recentItemTitle}>{invoice.customerName}</Text>
              <Text style={styles.recentItemDate}>
                {new Date(invoice.date).toLocaleDateString()}
              </Text>
            </View>
            <View>
              <Text style={styles.recentItemAmount}>
                ${invoice.total.toFixed(2)}
              </Text>
              <Text style={[
                styles.recentItemStatus,
                invoice.status === 'paid' ? styles.paidStatus : styles.pendingStatus
              ]}>
                {invoice.status.toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={showGoalModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowGoalModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Growth Target</Text>
              <TouchableOpacity onPress={() => setShowGoalModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>Current revenue</Text>
              <Text style={styles.currentRevenue}>
                ${currentRevenue.toLocaleString()}
              </Text>

              <View style={styles.goalTypeContainer}>
                <TouchableOpacity
                  style={[
                    styles.goalTypeButton,
                    goalType === 'percentage' && styles.goalTypeButtonActive
                  ]}
                  onPress={() => setGoalType('percentage')}
                >
                  <Text style={[
                    styles.goalTypeText,
                    goalType === 'percentage' && styles.goalTypeTextActive
                  ]}>
                    Percentage Growth
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.goalTypeButton,
                    goalType === 'fixed' && styles.goalTypeButtonActive
                  ]}
                  onPress={() => setGoalType('fixed')}
                >
                  <Text style={[
                    styles.goalTypeText,
                    goalType === 'fixed' && styles.goalTypeTextActive
                  ]}>
                    Fixed Amount
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalLabel}>
                {goalType === 'percentage' ? 'Growth Percentage' : 'Target Revenue Amount'}
              </Text>
              <View style={styles.inputContainer}>
                {goalType === 'fixed' && <Text style={styles.currencySymbol}>$</Text>}
                <TextInput
                  style={styles.modalInput}
                  value={targetAmount}
                  onChangeText={setTargetAmount}
                  keyboardType="numeric"
                  placeholder={goalType === 'percentage' ? "Enter percentage" : "Enter amount"}
                  placeholderTextColor="#6B7280"
                />
                {goalType === 'percentage' && <Text style={styles.percentageSymbol}>%</Text>}
              </View>

              {goalType === 'percentage' && targetAmount && (
                <Text style={styles.calculatedAmount}>
                  New target: ${(currentRevenue + (currentRevenue * Number(targetAmount) / 100)).toLocaleString()}
                </Text>
              )}

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowGoalModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.setTargetButton}
                  onPress={handleSetGoal}
                >
                  <Text style={styles.setTargetButtonText}>Set Target</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  contentContainer: {
    padding: 16,
    ...(Platform.OS === 'web' ? { minHeight: '100%' } : {}),
  },
  progressSection: {
    backgroundColor: '#374151',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F3F4F6',
    marginBottom: 4,
  },
  progressAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F3F4F6',
  },
  setGoalButton: {
    backgroundColor: '#4B5563',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#6B7280',
  },
  setGoalText: {
    color: '#F3F4F6',
    fontSize: 14,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
  },
  progressBar: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#34D399',
    borderRadius: 4,
  },
  pendingBar: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#FBBF24',
    borderRadius: 4,
  },
  progressLegend: {
    marginTop: 12,
  },
  progressPercentage: {
    fontSize: 14,
    color: '#F3F4F6',
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  paidDot: {
    backgroundColor: '#34D399',
  },
  pendingDot: {
    backgroundColor: '#FBBF24',
  },
  legendText: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  metricLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F3F4F6',
  },
  pendingValue: {
    color: '#FBBF24',
  },
  metricSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  recentSection: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 16,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  recentItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F3F4F6',
    marginBottom: 4,
  },
  recentItemDate: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  recentItemAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F3F4F6',
    textAlign: 'right',
    marginBottom: 4,
  },
  recentItemStatus: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
  },
  paidStatus: {
    color: '#34D399',
  },
  pendingStatus: {
    color: '#FBBF24',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    width: '90%',
    maxWidth: 500,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F3F4F6',
  },
  modalClose: {
    fontSize: 20,
    color: '#9CA3AF',
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  currentRevenue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 24,
  },
  goalTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  goalTypeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
    alignItems: 'center',
  },
  goalTypeButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  goalTypeText: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
});