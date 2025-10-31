import { useState } from 'react';
import { FiGrid, FiDownload, FiCheck, FiArrowLeft, FiMonitor, FiPackage, FiZap } from 'react-icons/fi';

type Platform = 'linux' | 'windows';

const DownloadPage = () => {
  const [downloading, setDownloading] = useState<Platform | null>(null);
  const [completed, setCompleted] = useState<Record<Platform, boolean>>({} as Record<Platform, boolean>);

  const handleDownload = async (platform: Platform) => {
    const extension = platform === 'linux' ? '.exe' : '.exe';
    const fileName = `Rituraj${extension}`;
    
    setDownloading(platform);
    
    try {
      // Simulate download - replace with actual file path
      const response = await fetch(`/${fileName}`);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setTimeout(() => {
        setDownloading(null);
        setCompleted(prev => ({ ...prev, [platform]: true }));
      }, 1500);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
      setDownloading(null);
    }
  };

  const DownloadButton = ({ platform, icon: Icon, label, fileName }: {
    platform: Platform;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    fileName: string;
  }) => {
    const isDownloading = downloading === platform;
    const isCompleted = completed[platform];
    
    return (
      <button
        onClick={() => handleDownload(platform)}
        disabled={isDownloading}
        className="group relative flex items-center gap-4 w-full p-5 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
      >
        <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {isCompleted ? (
            <FiCheck className="w-7 h-7 text-primary" />
          ) : (
            <Icon className="w-7 h-7 text-primary" />
          )}
        </div>
        
        <div className="flex-1 text-left">
          <div className="font-semibold text-base mb-1">{label}</div>
          <div className="text-sm text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded inline-block">
            {fileName}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          {isDownloading ? (
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all">
              <FiDownload className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FiGrid className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">MindGrids</span>
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 mb-10">
            {/* Icon with gradient background */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <FiDownload className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20">
                <FiZap className="w-3.5 h-3.5 mr-1.5" />
                Ready to Install
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                Download MindGrids
              </h1>
              <p className="max-w-lg text-muted-foreground text-lg">
                Choose your platform below to download and start organizing your tasks efficiently.
              </p>
            </div>
          </div>

          {/* Download Options */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl">
              <h2 className="text-xl font-semibold mb-6 text-center">Select Your Platform</h2>
              <div className="space-y-4">
                <DownloadButton
                  platform="windows"
                  icon={FiMonitor}
                  label="Windows"
                  fileName="Rituraj.exe"
                />
                <DownloadButton
                  platform="linux"
                  icon={FiMonitor}
                  label="Linux"
                  fileName="Rituraj.exe"
                />
              </div>
            </div>

            {/* Installation Steps */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg">
              <h2 className="text-lg font-semibold mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-2">
                  <FiPackage className="h-4 w-4 text-secondary" />
                </div>
                Quick Installation Guide
              </h2>
              <div className="space-y-4">
                {[
                  { num: '1', text: 'Download the appropriate file for your operating system' },
                  { num: '2', text: 'Run the installer and follow the on-screen instructions' },
                  { num: '3', text: 'Launch MindGrids and start organizing your tasks' }
                ].map((step) => (
                  <div key={step.num} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-md">
                      {step.num}
                    </div>
                    <p className="pt-1 text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Notice */}
            <div className="rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 p-5 text-center">
              <p className="text-sm text-muted-foreground">
                Need help? Visit our{' '}
                <a href="#" className="text-primary font-medium hover:underline underline-offset-4 transition-colors">
                  documentation
                </a>
                {' '}or{' '}
                <a href="#" className="text-primary font-medium hover:underline underline-offset-4 transition-colors">
                  contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2025 MindGrids. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default DownloadPage;