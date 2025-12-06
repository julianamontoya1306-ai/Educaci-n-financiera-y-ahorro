import React from 'react';

export enum ViewState {
  HOME = 'HOME',
  LEARN = 'LEARN',
  CALCULATOR = 'CALCULATOR',
  CHAT = 'CHAT',
  VOICE = 'VOICE'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SavingsPlan {
  propertyValue: number;
  downPaymentPercent: number;
  currentSavings: number;
  monthlySavings: number;
}

export interface Topic {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}