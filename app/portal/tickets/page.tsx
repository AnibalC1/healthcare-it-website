'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Ticket {
  id: string;
  ticket_number: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function TicketsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    checkAuthAndFetchTickets();
  }, [filter]);

  const checkAuthAndFetchTickets = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push('/portal/login');
      return;
    }

    // Get client profile
    const { data: clientData } = await supabase
      .from('clients')
      .select('id')
      .eq('auth_user_id', session.user.id)
      .single();

    if (clientData) {
      await fetchTickets(clientData.id);
    }

    setLoading(false);
  };

  const fetchTickets = async (clientId: string) => {
    let query = supabase
      .from('tickets')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (!error && data) {
      setTickets(data);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'waiting-client': 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'text-gray-600',
      medium: 'text-blue-600',
      high: 'text-orange-600',
      urgent: 'text-red-600',
    };
    return colors[priority] || 'text-gray-600';
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/portal/dashboard" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
            </div>
            <Link
              href="/portal/tickets/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Ticket
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {['all', 'open', 'in-progress', 'waiting-client', 'resolved', 'closed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All Tickets' : status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">🎫</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No tickets found</h2>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? "You don't have any support tickets yet."
                : `No ${filter.replace('-', ' ')} tickets.`}
            </p>
            <Link
              href="/portal/tickets/new"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Ticket
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Link key={ticket.id} href={`/portal/tickets/${ticket.id}`} className="block">
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-500">{ticket.ticket_number}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                        <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📁 {ticket.category.replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                        <span>📅 {new Date(ticket.created_at).toLocaleDateString()}</span>
                        <span>🕐 Updated {new Date(ticket.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
