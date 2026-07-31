'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Ticket {
  id: string;
  ticket_number: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  resolution: string | null;
  created_at: string;
  updated_at: string;
}

interface TicketUpdate {
  id: string;
  message: string;
  author_type: string;
  author_name: string;
  created_at: string;
}

export default function TicketDetailPage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [updates, setUpdates] = useState<TicketUpdate[]>([]);
  const [clientName, setClientName] = useState('You');
  const [reply, setReply] = useState('');
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ticketId) loadTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);

  const loadTicket = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push('/portal/login');
      return;
    }

    const { data: clientData } = await supabase
      .from('clients')
      .select('id, practice_name')
      .eq('auth_user_id', session.user.id)
      .single();

    if (!clientData) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    if (clientData.practice_name) setClientName(clientData.practice_name);

    // Fetch ticket scoped to this client (prevents cross-client access)
    const { data: ticketData } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', ticketId)
      .eq('client_id', clientData.id)
      .single();

    if (!ticketData) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setTicket(ticketData);
    await fetchUpdates();
    setLoading(false);
  };

  const fetchUpdates = async () => {
    const { data } = await supabase
      .from('ticket_updates')
      .select('*')
      .eq('ticket_id', ticketId)
      .eq('internal', false)
      .order('created_at', { ascending: true });

    if (data) setUpdates(data);
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;

    setPosting(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('ticket_updates').insert({
        ticket_id: ticketId,
        message: reply.trim(),
        author_type: 'client',
        author_name: clientName,
        internal: false,
      });

      if (insertError) throw insertError;

      setReply('');
      await fetchUpdates();
    } catch (err: any) {
      setError(err.message || 'Failed to post reply. Please try again.');
    } finally {
      setPosting(false);
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

  const formatStatus = (s: string) =>
    s.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (notFound || !ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow p-12 text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Ticket not found</h1>
          <p className="text-gray-600 mb-6">
            This ticket doesn&apos;t exist or you don&apos;t have access to it.
          </p>
          <Link
            href="/portal/tickets"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/portal/tickets" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
            ← Back to Tickets
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-mono text-gray-500">{ticket.ticket_number}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
              {formatStatus(ticket.status)}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">{ticket.title}</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid sm:grid-cols-3 gap-4 mb-6 text-sm">
            <div>
              <div className="text-gray-500">Category</div>
              <div className="font-medium text-gray-900">{formatStatus(ticket.category)}</div>
            </div>
            <div>
              <div className="text-gray-500">Priority</div>
              <div className="font-medium text-gray-900">{formatStatus(ticket.priority)}</div>
            </div>
            <div>
              <div className="text-gray-500">Opened</div>
              <div className="font-medium text-gray-900">
                {new Date(ticket.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <div className="text-gray-500 text-sm mb-1">Description</div>
            <p className="text-gray-900 whitespace-pre-wrap">{ticket.description}</p>
          </div>
          {ticket.resolution && (
            <div className="border-t border-gray-100 pt-4 mt-4">
              <div className="text-gray-500 text-sm mb-1">Resolution</div>
              <p className="text-gray-900 whitespace-pre-wrap">{ticket.resolution}</p>
            </div>
          )}
        </div>

        {/* Conversation */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity</h2>
          {updates.length === 0 ? (
            <p className="text-gray-500 text-sm">No replies yet.</p>
          ) : (
            <div className="space-y-4">
              {updates.map((u) => (
                <div
                  key={u.id}
                  className={`p-4 rounded-lg ${
                    u.author_type === 'staff' ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {u.author_name}
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        {u.author_type === 'staff' ? 'Support' : 'Client'}
                      </span>
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(u.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">{u.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reply */}
        {ticket.status !== 'closed' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add a Reply</h2>
            <form onSubmit={handleReply} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your reply..."
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={posting}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {posting ? 'Posting...' : 'Post Reply'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
