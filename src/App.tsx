/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppState, UserProfile } from './types.ts';
import SplashScreen from './components/screens/SplashScreen.tsx';
import PermissionsScreen from './components/screens/PermissionsScreen.tsx';
import UserSetupScreen from './components/screens/UserSetupScreen.tsx';
import MonitoringScreen from './components/screens/MonitoringScreen.tsx';
import AlertScreens from './components/screens/AlertScreens.tsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppState>(AppState.SPLASH);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isMonitoringActive, setIsMonitoringActive] = useState(false);

  // Transitions
  const toPermissions = () => setCurrentPage(AppState.PERMISSIONS);
  const toSetup = () => setCurrentPage(AppState.USER_SETUP);
  const toMonitoring = (profile?: UserProfile) => {
    if (profile) setUserProfile(profile);
    setCurrentPage(AppState.MONITORING_INACTIVE);
  };
  
  const toggleMonitoring = () => setIsMonitoringActive(!isMonitoringActive);

  const triggerValidation = () => {
    if (isMonitoringActive) {
      setCurrentPage(AppState.PRE_DANGER_VALIDATION);
    }
  };

  const triggerDanger = () => {
    setCurrentPage(AppState.DANGER_DETECTED);
  };

  const triggerEscalation = () => {
    setCurrentPage(AppState.EMERGENCY_ACTIVATED);
    // Simulate AI Agent finishing after a while
    setTimeout(() => {
      // Stay in Activated state until user clicks safe manually or it finishes
    }, 10000);
  };

  const setSafe = () => {
    setCurrentPage(AppState.POST_EMERGENCY);
    setIsMonitoringActive(false);
  };

  const resetMonitoring = () => {
    setCurrentPage(AppState.MONITORING_INACTIVE);
    setIsMonitoringActive(false);
  };

  return (
    <div className="bg-brand-blue min-h-screen text-white font-sans selection:bg-brand-accent selection:text-brand-blue">
      <AnimatePresence mode="wait">
        {currentPage === AppState.SPLASH && (
          <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SplashScreen onComplete={toPermissions} />
          </motion.div>
        )}

        {currentPage === AppState.PERMISSIONS && (
          <motion.div key="permissions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PermissionsScreen onComplete={toSetup} />
          </motion.div>
        )}

        {currentPage === AppState.USER_SETUP && (
          <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <UserSetupScreen onComplete={toMonitoring} />
          </motion.div>
        )}

        {/* The Monitoring interface serves as the base for inactive/active states */}
        {(currentPage === AppState.MONITORING_INACTIVE || currentPage === AppState.MONITORING_ACTIVE) && (
          <motion.div key="monitoring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MonitoringScreen 
              isActive={isMonitoringActive}
              onToggle={toggleMonitoring}
              onTriggerAlert={triggerValidation}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay Alert Screens */}
      <AnimatePresence>
        {[
          AppState.PRE_DANGER_VALIDATION, 
          AppState.DANGER_DETECTED, 
          AppState.EMERGENCY_ACTIVATED, 
          AppState.POST_EMERGENCY
        ].includes(currentPage) && (
          <motion.div key="alerts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AlertScreens 
              currentStep={currentPage}
              onCancel={setSafe}
              onEscalate={currentPage === AppState.PRE_DANGER_VALIDATION ? triggerDanger : triggerEscalation}
              onRestart={resetMonitoring}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
