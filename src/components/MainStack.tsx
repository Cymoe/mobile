import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { InvoiceList } from "./InvoiceList";
import { CreateInvoice } from "./CreateInvoice";
import { InvoiceDetails } from "./InvoiceDetails";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Invoices"
            screenOptions={{
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Invoices"
                component={InvoiceList}
                options={{ title: "Invoices" }}
            />
            <StackNavigator.Screen
                name="CreateInvoice"
                component={CreateInvoice}
                options={{ title: "Create Invoice" }}
            />
            <StackNavigator.Screen
                name="InvoiceDetails"
                component={InvoiceDetails}
                options={{ title: "Invoice Details" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);