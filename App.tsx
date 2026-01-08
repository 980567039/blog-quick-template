
import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Database, 
  Settings, 
  Copy, 
  CheckCircle2, 
  Sparkles,
  Github,
  Zap,
  ArrowRight,
  Info,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Step } from './types';

// Internal Components
interface StepCardProps {
  step: Step;
  isActive: boolean;
  isCompleted: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, isActive, isCompleted }) => (
  <div className={`p-6 rounded-2xl transition-all duration-300 border-2 ${
    isActive 
      ? 'bg-white border-blue-500 shadow-xl scale-105' 
      : isCompleted 
        ? 'bg-slate-50 border-green-200' 
        : 'bg-slate-50 border-slate-100 opacity-60'
  }`}>
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-xl ${
        isActive ? 'bg-blue-100 text-blue-600' : isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'
      }`}>
        {step.icon}
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1">{step.title}</h3>
        <p className="text-slate-500 text-sm">{step.description}</p>
      </div>
      {isCompleted && <CheckCircle2 className="ml-auto text-green-500" size={20} />}
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [repoUrl] = useState('https://github.com/980567039/blog-template.git');
  const [projectName, setProjectName] = useState('My-Payload-Blog');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedSecret, setSuggestedSecret] = useState('');

  // Auto-generate secret on mount
  useEffect(() => {
    if (!suggestedSecret) {
      setSuggestedSecret(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    }
  }, []);

  const handleNextToStep2 = async () => {
    if (activeStep === 1 && projectName.length < 3) {
      alert("请输入一个有效的项目名称（至少3个字符）");
      return;
    }
    setActiveStep(2);
  };

  const getVercelDeployUrl = () => {
    const baseUrl = 'https://vercel.com/new/clone';
    const params = new URLSearchParams({
      'repository-url': repoUrl,
      'env': 'PAYLOAD_SECRET,DATABASE_URL',
      'envDescription': 'PAYLOAD_SECRET 是安全密钥（已为你生成）。DATABASE_URL 是你的 MongoDB Atlas 连接字符串。',
      'project-name': projectName,
      'repository-name': projectName.toLowerCase().replace(/\s+/g, '-'),
      'demo-title': projectName,
      'demo-description': '基于 Payload CMS 的现代化博客系统'
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const steps: Step[] = [
    {
      id: 1,
      title: "确认模板与命名",
      description: "核对源码并设置你的项目名称",
      icon: <Github size={24} />
    },
    {
      id: 2,
      title: "准备数据库链接",
      description: "获取并核对必要的环境变量",
      icon: <Database size={24} />
    },
    {
      id: 3,
      title: "一键上线",
      description: "在 Vercel 自动完成部署",
      icon: <Rocket size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="max-w-4xl w-full text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 shadow-lg shadow-blue-200">
          <Zap size={16} />
          <span>Payload CMS 极速部署助手</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          部署你的专属 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Payload 博客</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          无需代码开发，只需准备好数据库链接，即可在 Vercel 上拥有一个完整的、带后台的博客系统。
        </p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Steps Navigation */}
        <div className="space-y-4">
          {steps.map((step) => (
            <StepCard 
              key={step.id} 
              step={step} 
              isActive={activeStep === step.id} 
              isCompleted={activeStep > step.id}
            />
          ))}
          
          <div className="p-6 bg-indigo-900 text-white rounded-3xl shadow-xl mt-8 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <Sparkles size={18} />
                部署优势
              </h4>
              <ul className="text-indigo-200 text-sm space-y-3">
                <li className="flex items-start gap-2">
                  <span className="bg-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 font-bold">1</span>
                  <span><strong>永久免费：</strong> 巧用 Vercel 和 MongoDB 免费层</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 font-bold">2</span>
                  <span><strong>自带后台：</strong> 强大的 Payload CMS 管理面板</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 font-bold">3</span>
                  <span><strong>极致体验：</strong> 响应式前端 + 现代 UI</span>
                </li>
              </ul>
            </div>
            <div className="absolute -right-8 -bottom-8 text-white/10 rotate-12">
              <Rocket size={120} />
            </div>
          </div>
        </div>

        {/* Right: Interaction Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[520px] flex flex-col transition-all">
            
            {/* STEP 1: Name and Template */}
            {activeStep === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Github size={24} className="text-slate-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">当前部署模板</h4>
                      <p className="text-xs text-slate-400 font-mono break-all">{repoUrl}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">给你的博客起个名字</label>
                    <input 
                      type="text" 
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value.replace(/[^a-zA-Z0-9-]/g, '-'))}
                      placeholder="例如: my-personal-blog"
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg font-medium"
                    />
                    <p className="text-xs text-slate-400">项目名将作为 Vercel 的二级域名，仅限字母、数字和连字符。</p>
                  </div>
                  
                  <button 
                    onClick={handleNextToStep2}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-3"
                  >
                    下一步：配置数据库链接 <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Pure Database & Environment Prep */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-blue-600 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden mb-4">
                  <div className="relative z-10">
                    <h4 className="font-bold text-xl flex items-center gap-2 mb-4">
                      <Database size={22} /> 数据库配置指南
                    </h4>
                    <ul className="space-y-4 text-sm text-blue-50">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 font-bold border border-blue-400">1</span>
                        <p>登录 <a href="https://www.mongodb.com/atlas/database" target="_blank" className="underline font-bold hover:text-white">MongoDB Atlas</a>，创建一个 <strong>FREE</strong> 集群。</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 font-bold border border-blue-400">2</span>
                        <p>在 <strong>Network Access</strong> 中，添加 IP 地址 <code>0.0.0.0/0</code>（允许 Vercel 访问）。</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 font-bold border border-blue-400">3</span>
                        <p>在 <strong>Database Access</strong> 创建用户并记录 <strong>用户名和密码</strong>。</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 font-bold border border-blue-400">4</span>
                        <p>点击 <strong>Connect</strong> -> <strong>Drivers</strong>，获取如下形式的字符串：<br/>
                        <code className="bg-blue-700 px-2 py-1 rounded mt-1 inline-block text-[11px]">mongodb+srv://user:pass@cluster.mongodb.net/...</code></p>
                      </li>
                    </ul>
                  </div>
                  <Database size={120} className="absolute -right-6 -bottom-6 text-white/10 rotate-12" />
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-bold mb-1">
                    <ShieldCheck size={20} className="text-green-500" />
                    已自动生成的环境变量
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Payload Secret (安全密钥)</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          readOnly
                          value={suggestedSecret}
                          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-mono text-xs outline-none"
                        />
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(suggestedSecret);
                            alert("密钥已复制，一会儿在 Vercel 中填入！");
                          }}
                          className="p-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shrink-0"
                        >
                          <Copy size={20} className="text-slate-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setActiveStep(1)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-xl transition-all"
                  >
                    返回
                  </button>
                  <button 
                    onClick={() => setActiveStep(3)}
                    className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    我已获取数据库链接，下一步 <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Deploy Finalization */}
            {activeStep === 3 && (
              <div className="space-y-8 animate-in zoom-in duration-500 flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 relative">
                  <CheckCircle2 size={56} />
                  <div className="absolute -top-1 -right-1">
                    <span className="flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">部署方案已就绪！</h2>
                  <p className="text-slate-500 max-w-sm mb-2">
                    即将跳转至 Vercel 部署页面。
                  </p>
                  <div className="p-4 bg-orange-50 text-orange-700 rounded-xl text-sm font-medium border border-orange-100">
                    注意：Vercel 会要求你输入 <strong>DATABASE_URL</strong> 和 <strong>PAYLOAD_SECRET</strong>，请使用你在上一步准备好的值。
                  </div>
                </div>

                <div className="w-full space-y-6">
                  <a 
                    href={getVercelDeployUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <div className="bg-black text-white px-8 py-5 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-900 transition-all shadow-xl shadow-slate-200 border-2 border-transparent hover:border-blue-500">
                      <svg width="24" height="24" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white"/>
                      </svg>
                      <span className="text-xl font-bold">Deploy to Vercel</span>
                    </div>
                  </a>

                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">部署链接预览</p>
                    <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-between gap-4">
                      <code className="text-[10px] text-slate-500 truncate text-left flex-1 font-mono">
                        {getVercelDeployUrl()}
                      </code>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(getVercelDeployUrl());
                          alert("链接已复制！");
                        }}
                        className="flex items-center gap-1 text-sm text-blue-600 font-bold hover:text-blue-700 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 transition-all"
                      >
                        <Copy size={16} /> 复制
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveStep(1)}
                  className="mt-8 text-slate-400 hover:text-slate-600 text-sm flex items-center gap-1 transition-colors"
                >
                  <Settings size={14} /> 重新调整配置
                </button>
              </div>
            )}
          </div>

          {/* Tips for users who already deployed */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-green-50 rounded-2xl shrink-0">
              <Zap className="text-green-600" size={32} />
            </div>
            <div>
              <h5 className="font-bold text-slate-800 mb-1">
                完成部署后的第一步
              </h5>
              <p className="text-sm text-slate-500">
                部署成功后，请立即访问 <code>你的域名/admin</code>。Payload 会引导你创建首个管理员账号，随后即可进入管理后台发布文章。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-12 border-t border-slate-200 w-full max-w-6xl text-center">
        <div className="flex justify-center flex-wrap gap-8 mb-6">
          <a href={repoUrl} target="_blank" className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium">
            <Github size={18} /> 源码仓库
          </a>
          <a href="https://vercel.com/docs" target="_blank" className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium">
            <Rocket size={18} /> Vercel 文档
          </a>
          <a href="https://payloadcms.com/docs" target="_blank" className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium">
            <ExternalLink size={18} /> Payload 官方
          </a>
        </div>
        <p className="text-slate-400 text-sm italic">
          让每个人都能享受高性能 Headless CMS 的魅力
        </p>
      </footer>
    </div>
  );
};

export default App;
