
import React from 'react';

export interface DeployConfig {
  repoUrl: string;
  projectName: string;
  description: string;
  mongoType: 'atlas' | 'custom';
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}