'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface DashboardStats {
  openTickets: number;
  upcomingAppointments: number;
  unpaidInvoices: number;
  expiringDocuments: number;
}

export default function PortalDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    openTickets: 0,
    upcomingAppointments: 0,
    unpaidInvoices: 0,
    expiringDocuments: 0,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push('/portal/login');
      return;
    }

    // Fetch client profile
    const { data: clientData } = await supabase
      .from('clients')
      .select('*')
      .eq('auth_user_id', session.user.id)
      .single();

    if (clientData) {
      setClient(clientData);
      fetchDashboardStats(clientData.id);
    }

    setLoading(false);
  };

  const fetchDashboardStats = async (clientId: string) => {
    // Fetch open tickets count
    const { count: ticketsCount } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', clientId)
      .in('status', ['open', 'in-progress']);

    // Fetch unpaid invoices count
    const { count: invoicesCount } = await supabase
      .from('invoices')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', clientId)
      .in('status', ['sent', 'unpaid', 'overdue']);

    // Fetch expiring documents count (within 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const { count: docsCount } = await supabase
      .from('compliance_documents')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', clientId)
      .eq('status', 'active')
      .lte('expiry_date', thirtyDaysFromNow.toISOString().split('T')[0]);

    setStats({
      openTickets: ticketsCount || 0,
      upcomingAppointments: 0, // Would integrate with Cal.com API
      unpaidInvoices: invoicesCount || 0,
      expiringDocuments: docsCount || 0,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/portal/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Healthcare IT Solutions
              </Link>
              <p className="text-sm text-gray-600 mt-1">Client Portal</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {client?.primary_contact_name} • {client?.practice_name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {client?.primary_contact_name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {client?.practice_name} • {client?.service_package?.toUpperCase()} Plan
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Open Tickets"
            value={stats.openTickets}
            icon="🎫"
            link="/portal/tickets"
            color="blue"
          />
          <StatCard
            title="Upcoming Appointments"
            value={stats.upcomingAppointments}
            icon="📅"
            link="/portal/appointments"
            color="green"
          />
          <StatCard
            title="Unpaid Invoices"
            value={stats.unpaidInvoices}
            icon="💳"
            link="/portal/invoices"
            color="yellow"
          />
          <StatCard
            title="Expiring Documents"
            value={stats.expiringDocuments}
            icon="📄"
            link="/portal/compliance"
            color="red"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionButton
              title="Submit a Ticket"
              description="Get help with an issue"
              link="/portal/tickets/new"
              icon="🆘"
            />
            <ActionButton
              title="Schedule Service"
              description="Book an appointment"
              link="/portal/appointments/new"
              icon="📆"
            />
            <ActionButton
              title="Knowledge Base"
              description="Self-service guides"
              link="/portal/knowledge-base"
              icon="📚"
            />
          </div>
        </div>

        {/* Main Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NavCard
            title="Support Tickets"
            description="View and manage your support requests"
            link="/portal/tickets"
            icon="🎫"
          />
          <NavCard
            title="Invoices & Billing"
            description="Access invoices and payment history"
            link="/portal/invoices"
            icon="💰"
          />
          <NavCard
            title="Compliance Documents"
            description="HIPAA audits, security reports, certificates"
            link="/portal/compliance"
            icon="🔒"
          />
          <NavCard
            title="Knowledge Base"
            description="Video guides and troubleshooting tips"
            link="/portal/knowledge-base"
            icon="📖"
          />
          <NavCard
            title="Settings"
            description="Update your profile and preferences"
            link="/portal/settings"
            icon="⚙️"
          />
          <NavCard
            title="Contact Support"
            description="Need immediate help? Reach out to us"
            link="/contact"
            icon="📞"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, link, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    red: 'bg-red-50 text-red-700',
  };

  return (
    <Link href={link} className="block">
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{icon}</span>
          <span className={`text-3xl font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>
            {value}
          </span>
        </div>
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>
    </Link>
  );
}

function ActionButton({ title, description, link, icon }: any) {
  return (
    <Link href={link} className="block">
      <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all group">
        <div className="text-2xl mb-2">{icon}</div>
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

function NavCard({ title, description, link, icon }: any) {
  return (
    <Link href={link} className="block">
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1">
          View details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
