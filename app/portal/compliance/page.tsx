'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface ComplianceDocument {
  id: string;
  title: string;
  document_type: string;
  issued_date: string;
  expiry_date: string;
  status: string;
  file_url: string;
}

export default function CompliancePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<ComplianceDocument[]>([]);

  useEffect(() => {
    checkAuthAndFetchDocuments();
  }, []);

  const checkAuthAndFetchDocuments = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push('/portal/login');
      return;
    }

    const { data: clientData } = await supabase
      .from('clients')
      .select('id')
      .eq('auth_user_id', session.user.id)
      .single();

    if (clientData) {
      const { data } = await supabase
        .from('compliance_documents')
        .select('*')
        .eq('client_id', clientData.id)
        .order('issued_date', { ascending: false });

      if (data) setDocuments(data);
    }

    setLoading(false);
  };

  const getDocumentTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'hipaa-audit': '🔐',
      'security-assessment': '🛡️',
      'baa': '📜',
      'policy': '📋',
      'certificate': '🏆',
      'report': '📊',
    };
    return icons[type] || '📄';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      archived: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const isExpiringSoon = (expiryDate: string) => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return new Date(expiryDate) <= thirtyDaysFromNow;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/portal/dashboard" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Documents</h1>
          <p className="text-sm text-gray-600 mt-1">HIPAA audits, security assessments, and certifications</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {documents.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No documents yet</h2>
            <p className="text-gray-600">Your compliance documents will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{getDocumentTypeIcon(doc.document_type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {doc.document_type.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </p>
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <div>📅 Issued: {new Date(doc.issued_date).toLocaleDateString()}</div>
                      <div className={isExpiringSoon(doc.expiry_date) ? 'text-red-600 font-medium' : ''}>
                        ⏰ Expires: {new Date(doc.expiry_date).toLocaleDateString()}
                        {isExpiringSoon(doc.expiry_date) && ' (Expiring Soon!)'}
                      </div>
                    </div>
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Document
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
