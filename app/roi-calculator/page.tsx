'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ROICalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    practiceSize: '',
    currentITSpend: '',
    downtimeHours: '',
    securityIncidents: '',
    complianceStatus: '',
    email: '',
    practiceName: '',
  });
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateROI = () => {
    const practiceSize = parseInt(formData.practiceSize) || 0;
    const currentSpend = parseFloat(formData.currentITSpend) || 0;
    const downtime = parseFloat(formData.downtimeHours) || 0;
    const incidents = parseInt(formData.securityIncidents) || 0;

    // Cost calculations based on industry averages
    const avgRevenuePerProvider = 350000; // Annual revenue per provider
    const hourlyRate = avgRevenuePerProvider / (40 * 52); // ~$168/hour
    const downtimeCost = downtime * hourlyRate * practiceSize;

    // Security incident costs (avg $25K per incident for small healthcare practices)
    const securityCost = incidents * 25000;

    // Compliance fines risk (HIPAA violations avg $50K-1.5M)
    const complianceRisk = formData.complianceStatus === 'non-compliant' ? 50000 :
                          formData.complianceStatus === 'partially' ? 15000 : 0;

    // Inefficiency costs (poor IT = 2-5 hours/week wasted per provider)
    const inefficiencyCost = practiceSize * 3 * hourlyRate * 52;

    // Total annual cost of poor IT
    const totalAnnualCost = downtimeCost + securityCost + complianceRisk + inefficiencyCost;

    // Recommended service package based on practice size
    const recommendedPackage = practiceSize <= 3 ? 'Bronze' :
                              practiceSize <= 8 ? 'Silver' : 'Gold';

    const packageCost = practiceSize <= 3 ? 800 * 12 :
                       practiceSize <= 8 ? 1200 * 12 : 1800 * 12;

    // ROI calculation
    const potentialSavings = totalAnnualCost - packageCost;
    const roiPercentage = ((potentialSavings / packageCost) * 100).toFixed(0);

    setResults({
      downtimeCost: downtimeCost.toFixed(0),
      securityCost: securityCost.toFixed(0),
      complianceRisk: complianceRisk.toFixed(0),
      inefficiencyCost: inefficiencyCost.toFixed(0),
      totalAnnualCost: totalAnnualCost.toFixed(0),
      recommendedPackage,
      packageCost: packageCost.toFixed(0),
      potentialSavings: potentialSavings.toFixed(0),
      roiPercentage,
    });

    setStep(3);
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Submit to Supabase
    try {
      const response = await fetch('/api/roi-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, results }),
      });

      if (response.ok) {
        setStep(4);
      }
    } catch (error) {
      console.error('Failed to submit', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600 inline-block mb-4">
            Healthcare IT Solutions
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            IT Cost & ROI Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Discover how much poor IT is costing your practice
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
            <span className="text-sm font-medium text-gray-600">{(step / 4 * 100).toFixed(0)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Practice Info */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Tell us about your practice</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many providers are in your practice?
                </label>
                <select
                  name="practiceSize"
                  value={formData.practiceSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select practice size</option>
                  <option value="1">1 provider</option>
                  <option value="2">2 providers</option>
                  <option value="3">3 providers</option>
                  <option value="5">4-5 providers</option>
                  <option value="7">6-8 providers</option>
                  <option value="10">9-12 providers</option>
                  <option value="15">13+ providers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you currently spend on IT per month?
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    name="currentITSpend"
                    value={formData.currentITSpend}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Include software, hardware, support contracts</p>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.practiceSize || !formData.currentITSpend}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Pain Points */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <button
              onClick={() => setStep(1)}
              className="text-blue-600 hover:text-blue-700 text-sm mb-4 flex items-center gap-1"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-semibold mb-6">How is poor IT impacting your practice?</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many hours of downtime have you experienced in the past year?
                </label>
                <input
                  type="number"
                  name="downtimeHours"
                  value={formData.downtimeHours}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Network outages, system crashes, ransomware, etc.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many security incidents have you had in the past year?
                </label>
                <input
                  type="number"
                  name="securityIncidents"
                  value={formData.securityIncidents}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Phishing, breaches, ransomware attempts, lost devices</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What is your current HIPAA compliance status?
                </label>
                <select
                  name="complianceStatus"
                  value={formData.complianceStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select status</option>
                  <option value="compliant">Fully compliant (recent audit passed)</option>
                  <option value="partially">Partially compliant (some gaps)</option>
                  <option value="non-compliant">Not sure / Non-compliant</option>
                </select>
              </div>

              <button
                onClick={calculateROI}
                disabled={!formData.downtimeHours || !formData.securityIncidents || !formData.complianceStatus}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate My Costs
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && results && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-red-100 text-red-600 px-6 py-3 rounded-lg mb-4">
                <div className="text-sm font-medium mb-1">Your Annual IT Risk Cost</div>
                <div className="text-4xl font-bold">${parseInt(results.totalAnnualCost).toLocaleString()}</div>
              </div>
              <p className="text-gray-600">Here's how that breaks down:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="text-sm text-gray-600">Downtime Costs</div>
                <div className="text-2xl font-bold text-gray-900">${parseInt(results.downtimeCost).toLocaleString()}</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-sm text-gray-600">Security Incident Costs</div>
                <div className="text-2xl font-bold text-gray-900">${parseInt(results.securityCost).toLocaleString()}</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-2xl mb-2">⚖️</div>
                <div className="text-sm text-gray-600">Compliance Risk</div>
                <div className="text-2xl font-bold text-gray-900">${parseInt(results.complianceRisk).toLocaleString()}</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-2xl mb-2">⏳</div>
                <div className="text-sm text-gray-600">Inefficiency Costs</div>
                <div className="text-2xl font-bold text-gray-900">${parseInt(results.inefficiencyCost).toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">💰 Your Potential Savings with Our {results.recommendedPackage} Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Annual Investment</div>
                  <div className="text-2xl font-bold text-gray-900">${parseInt(results.packageCost).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Potential Savings</div>
                  <div className="text-2xl font-bold text-green-600">${parseInt(results.potentialSavings).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">ROI</div>
                  <div className="text-2xl font-bold text-green-600">{results.roiPercentage}%</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                By partnering with us, you could save <span className="font-bold">${parseInt(results.potentialSavings).toLocaleString()}</span> annually while eliminating IT headaches and ensuring HIPAA compliance.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Get your detailed ROI report</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Practice Name</label>
                  <input
                    type="text"
                    name="practiceName"
                    value={formData.practiceName}
                    onChange={handleInputChange}
                    placeholder="Your Practice Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@practice.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.email || !formData.practiceName || loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Email My Full Report'}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  We'll also include a personalized proposal for your practice.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Thank You */}
        {step === 4 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Report Sent!</h2>
            <p className="text-gray-600 mb-6">
              Check your inbox for your detailed ROI report and personalized proposal.
            </p>
            <div className="space-y-3">
              <Link
                href="/assessment"
                className="block bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Schedule a Free Assessment
              </Link>
              <Link
                href="/"
                className="block text-blue-600 hover:text-blue-700 font-medium"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
