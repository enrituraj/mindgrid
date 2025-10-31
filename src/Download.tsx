import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGrid, FiDownload, FiCheck, FiArrowLeft, FiPackage, FiClock, FiZap } from 'react-icons/fi';

const DownloadPage = () => {
  const [countdown, setCountdown] = useState(10);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !downloadStarted) {
      startDownload();
    }
  }, [countdown, downloadStarted]);

  const startDownload = async () => {
    setDownloadStarted(true);
    try {
      const response = await fetch('/Rituraj.exe');
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Rituraj.exe';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
      // Simulate download completion
      setTimeout(() => {
        setDownloadComplete(true);
      }, 1500);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const progress = ((10 - countdown) / 10) * 100;

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Header */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FiGrid className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">MindGrids</span>
            </div>
            <a 
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"
        />

        <div className="max-w-2xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            {/* Icon Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex justify-center mb-8"
            >
              {!downloadComplete ? (
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center"
                  >
                    <FiDownload className="w-10 h-10 text-primary" />
                  </motion.div>
                  {countdown > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg"
                    >
                      {countdown}
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <FiCheck className="w-12 h-12 text-primary" />
                </motion.div>
              )}
            </motion.div>

            {/* Title & Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {downloadComplete ? (
                  "Download Complete! 🎉"
                ) : downloadStarted ? (
                  "Downloading..."
                ) : (
                  "Thank You for Downloading!"
                )}
              </h1>
              <p className="text-lg text-muted-foreground">
                {downloadComplete ? (
                  "MindGrids is ready to transform your productivity"
                ) : downloadStarted ? (
                  "Your download should start automatically"
                ) : (
                  `Your download will begin in ${countdown} seconds`
                )}
              </p>
            </motion.div>

            {/* Progress Bar */}
            {!downloadComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <div className="relative h-3 bg-secondary/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                  />
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                  <span>Preparing download...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              {downloadStarted && !downloadComplete && (
                <button
                  onClick={startDownload}
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                >
                  <FiDownload className="w-5 h-5" />
                  <span>Download Manually</span>
                </button>
              )}
              {downloadComplete && (
                <a
                  href="/"
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity"
                >
                  Back to Home
                </a>
              )}
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border-t border-border pt-8"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FiZap className="w-5 h-5 text-primary mr-2" />
                Next Steps
              </h3>
              <div className="space-y-3">
                {[
                  { icon: FiPackage, text: "Install MindGrids on your device" },
                  { icon: FiGrid, text: "Create your first task category" },
                  { icon: FiCheck, text: "Start organizing and conquering your goals" }
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    className="flex items-center space-x-3 text-muted-foreground"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span>{step.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8 p-4 bg-secondary/10 rounded-xl text-center"
            >
              <p className="text-sm text-muted-foreground">
                <FiClock className="w-4 h-4 inline mr-1" />
                Need help? Check out our{' '}
                <a href="#" className="text-primary hover:underline">
                  installation guide
                </a>
                {' '}or{' '}
                <a href="#" className="text-primary hover:underline">
                  contact support
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 text-center text-sm text-muted-foreground">
        <p>&copy; 2025 MindGrids. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DownloadPage;