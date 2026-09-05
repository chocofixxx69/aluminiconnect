import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../../services/api';
import { ClipLoader } from 'react-spinners';
import { FaNewspaper, FaCalendarAlt } from 'react-icons/fa';

export const NewsWidget = ({ news }) => {
    const navigate = useNavigate();
    return (
        <div className="dashboard-card p-3 bg-white mb-3 border-0">
            <div className="d-flex align-items-center gap-2 mb-3">
                <FaNewspaper size={13} className="text-mamcet-red" />
                <h6 className="fw-bold mb-0" style={{ fontSize: 12.5, letterSpacing: '0.4px', color: '#333' }}>COLLEGE NEWS</h6>
            </div>
            {news.map((item, index) => (
                <div key={index} className="news-item-compact mb-2 hover-bg-light p-2 rounded-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/events')}>
                    <p className="mb-0 small fw-bold" style={{ color: '#222' }}>{item.title}</p>
                    <span className="extra-small text-muted">{item.date}</span>
                </div>
            ))}
            <button className="btn btn-sm btn-outline-secondary w-100 fw-bold rounded-pill mt-1" onClick={() => navigate('/events')}>More News</button>
        </div>
    );
};

export const EventsWidget = ({ events }) => {
    const navigate = useNavigate();
    return (
        <div className="dashboard-card p-3 bg-white border-0 mb-3">
            <div className="d-flex align-items-center gap-2 mb-3">
                <FaCalendarAlt size={13} style={{ color: '#198754' }} />
                <h6 className="fw-bold mb-0" style={{ fontSize: 12.5, letterSpacing: '0.4px', color: '#333' }}>UPCOMING EVENTS</h6>
            </div>
            {events.map((event, index) => (
                <div
                    key={index}
                    className="event-item-sidebar mb-2 p-2 rounded-3 hover-bg-light"
                    style={{
                        cursor: 'pointer',
                        background: index === 0 ? 'rgba(200,64,34,0.05)' : 'var(--surface-muted, #f7f6fb)',
                        borderLeft: index === 0 ? '3px solid #c84022' : '3px solid transparent',
                    }}
                    onClick={() => navigate('/events')}
                >
                    <p className="mb-0 extra-small fw-bold" style={{ color: '#333' }}>{event.title}</p>
                </div>
            ))}
        </div>
    );
};

export const AdminStatsWidget = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await adminService.getStats();
                if (res.data?.data) setStats(res.data.data);
            } catch (err) {
                console.error("Failed to load admin widget stats.");
            }
        };
        fetchStats();
    }, []);

    if (!stats) {
        return (
            <div className="dashboard-card p-3 bg-white border-0 mb-3 text-center">
                <ClipLoader size={20} color="#c84022" />
            </div>
        );
    }

    const totalPending = stats.pendingAlumni + stats.pendingJobs + stats.pendingEvents;

    return (
        <div className="dashboard-card p-3 bg-white border-0 mb-3">
            <h6 className="fw-bold mb-3" style={{ fontSize: 12.5, letterSpacing: '0.4px', color: '#b3241f' }}>ADMIN MODERATION</h6>

            <div className="d-flex justify-content-between mb-2 small fw-bold">
                <span className="text-muted">Total Users</span>
                <span>{stats.totalUsers}</span>
            </div>

            <div className="d-flex justify-content-between mb-2 small fw-bold">
                <span className="text-muted">Total Posts</span>
                <span>{stats.totalPosts}</span>
            </div>

            <hr className="my-2" />

            <div className="d-flex justify-content-between mb-3 small fw-bold" style={{ color: totalPending > 0 ? '#c84022' : '#198754' }}>
                <span>Pending Approvals</span>
                <span>{totalPending}</span>
            </div>

            <button
                className="btn btn-sm text-white w-100 fw-bold rounded-pill"
                style={{ backgroundColor: '#c84022' }}
                onClick={() => navigate('/admin/approvals')}
            >
                Review Approvals
            </button>
        </div>
    );
};
