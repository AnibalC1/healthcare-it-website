'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  weight: number;
  category: 'security' | 'compliance' | 'backup' | 'infrastructure';
}

const questions: Question[] = [
  { id: 'q1', question: 'Do you have a documented HIPAA Security Risk Assessment completed in the last 12 months?', weight: 10, category: 'compliance' },
  { id: 'q2', question: 'Do you have Business Associate Agreements (BAAs) with all vendors who handle PHI?', weight: 10, category: 'compliance' },
  { id: 'q3', question: 'Have you tested your backup restoration process in the last 6 months?', weight: 10, category: 'backup' },
  { id: 'q4', question: 'Do you have an offsite/cloud backup solution running automatically?', weight: 8, category: 'backup' },
  { id: 'q5', question: 'Is Multi-Factor Authentication (MFA) enabled for all staff accounts?', weight: 10, category: 'security' },
  { id: 'q6', question: 'Do you have antivirus/EDR software on all workstations and servers?', weight: 8, category: 'security' },
  { id: 'q7', question: 'Have all staff completed HIPAA security awareness training in the last year?', weight: 8, category: 'compliance' },
  { id: 'q8', question: 'Do you have a documented Incident Response Plan?', weight: 7, category: 'security' },
  { id: 'q9', question: 'Are operating systems and software patched within 30 days of release?', weight: 8, category: 'infrastructure' },
  { id: 'q10', question: 'Do you have a firewall configured with strict access rules?', weight: 7, category: 'infrastructure' },
  { id: 'q11', question: 'Is your Wi-Fi network separate from your medical device/workstation network?', weight: 6, category: 'infrastructure' },
  { id: 'q12', question: 'Do you encrypt PHI at rest and in transit?', weight: 10, category: 'security' },
  { id: 'q13', question: 'Do you have automatic session timeout configured (15 minutes or less)?', weight: 5, category: 'compliance' },
  { id: 'q14', question: 'Do you have audit logging enabled on all systems that access PHI?', weight: 8, category: 'compliance' },
  { id: 'q15', question: 'Have you performed a penetration test or vulnerability scan in the last year?', weight: 7, category: 'security' },
];

export default function ITHealthCheck() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({ email: '', practiceName: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const questionId = questions[currentQuestion].id;
    setAnswers({ ...answers, [questionId]: answer });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;

    questions.forEach((q) => {
      maxScore += q.weight;
      if (answers[q.id]) {
        totalScore += q.weight;
      }
    });

    const percentage = Math.round((totalScore / maxScore) * 100);
    return { totalScore, maxScore, percentage };
  };

  const getCategoryScores = () => {
    const categories: Record<string, { score: number; max: number }> = {
      security: { score: 0, max: 0 },
      compliance: { score: 0, max: 0 },
      backup: { score: 0, max: 0 },
      infrastructure: { score: 0, max: 0 },
    };

    questions.forEach((q) => {
      categories[q.category].max += q.weight;
      if (answers[q.id]) {
        categories[q.category].score += q.weight;
      }
    });

    return categories;
  };

  const getRecommendations = () => {
    const categoryScores = getCategoryScores();
    const recommendations: string[] = [];

    Object.entries(categoryScores).forEach(([category, { score, max }]) => {
      const percentage = (score / max) * 100;
      if (percentage < 70) {
        recommendations.push(category);
      }
    });

    return recommendations;
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Low Risk', color: 'green', emoji: '✅' };
    if (percentage >= 70) return { level: 'Medium Risk', color: 'yellow', emoji: '⚠️' };
    if (percentage >= 50) return { level: 'High Risk', color: 'orange', emoji: '🔶' };
    return { level: 'Critical Risk', color: 'red', emoji: '🚨' };
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const recommendations = getRecommendations();

    try {
      await fetch('/api/health-check-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          score: score.percentage,
          answers,
          recommendations,
        }),
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Report Sent!</h2>
          <p className="text-gray-600 mb-6">
            Check your inbox for your detailed IT Security Health Report with personalized recommendations.
          </p>
          <div className="space-y-3">
            <Link
              href="/assessment"
              className="block bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Schedule a Free Consultation
            </Link>
            <Link
              href="/"
              className="block text-blue-600 hover:text-blue-700 font-medium"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const risk = getRiskLevel(score.percentage);
    const categoryScores = getCategoryScores();
    const recommendations = getRecommendations();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-block">
            ← Back to Homepage
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{risk.emoji}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your IT Security Health Score</h1>
              <div className={`text-6xl font-bold mb-2 ${
                risk.color === 'green' ? 'text-green-600' :
                risk.color === 'yellow' ? 'text-yellow-600' :
                risk.color === 'orange' ? 'text-orange-600' : 'text-red-600'
              }`}>
                {score.percentage}%
              </div>
              <div className={`inline-block px-6 py-2 rounded-full text-lg font-medium ${
                risk.color === 'green' ? 'bg-green-100 text-green-800' :
                risk.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                risk.color === 'orange' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
              }`}>
                {risk.level}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
              <div className="space-y-4">
                {Object.entries(categoryScores).map(([category, { score, max }]) => {
                  const percentage = Math.round((score / max) * 100);
                  return (
                    <div key={category}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {category.replace(/-/g, ' ')}
                        </span>
                        <span className="text-sm font-medium text-gray-700">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            percentage >= 70 ? 'bg-green-600' : percentage >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Critical Issues */}
            {recommendations.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-red-900 mb-3">⚠️ Critical Areas for Improvement</h2>
                <ul className="space-y-2">
                  {recommendations.map((rec) => (
                    <li key={rec} className="text-red-800 capitalize flex items-center gap-2">
                      <span>•</span>
                      <span>{rec.replace(/-/g, ' ')} protocols need immediate attention</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Get Full Report */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Get Your Detailed Report & Action Plan</h3>
              <p className="text-gray-600 mb-4">
                Enter your email to receive a comprehensive security assessment report with step-by-step remediation guidance.
              </p>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Practice Name"
                    value={formData.practiceName}
                    onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.email || !formData.practiceName}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Email My Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600 inline-block mb-4">
            Healthcare IT Solutions
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free IT Security Health Check
          </h1>
          <p className="text-xl text-gray-600">
            Answer 15 quick questions to discover your practice's security vulnerabilities
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
              {questions[currentQuestion].category.toUpperCase()}
            </span>
            <h2 className="text-2xl font-semibold text-gray-900">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="bg-green-50 border-2 border-green-200 hover:border-green-500 rounded-lg p-6 transition-all group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">✅</div>
              <div className="text-lg font-semibold text-gray-900">Yes</div>
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="bg-red-50 border-2 border-red-200 hover:border-red-500 rounded-lg p-6 transition-all group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">❌</div>
              <div className="text-lg font-semibold text-gray-900">No</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
