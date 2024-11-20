// Previous imports remain the same...

export function TemplateDetails({ route, navigation }: any) {
  const { template } = route.params as { template: InvoiceTemplate };

  // Previous functions remain the same...

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        {/* Previous header section remains the same */}

        <View style={styles.section}>
          <Text style={styles.label}>Default Due Date</Text>
          <Text style={styles.info}>
            {template.defaultDueDate === 0 ? 'Immediate' : `${template.defaultDueDate} days`}
          </Text>
        </View>

        {/* Rest of the component remains the same */}
      </View>
    </ScrollView>
  );
}

// Styles remain the same...