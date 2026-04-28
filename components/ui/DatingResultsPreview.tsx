"use client";
import React, { useEffect, useState } from 'react';
import { Lock, X, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { datingSamplePhotos, normalizeDatingGender, type DatingGender } from '../../lib/profileSamples';
import { useService } from '../../lib/ServiceContext';

/**
 * DatingResultsPreview - Blurred dating profiles for payment teaser
 * Shows Tinder/Bumble style profile cards with real blurred photos
 */
export function DatingResultsPreview() {
    const { searchTarget } = useService();
    const [gender, setGender] = useState<DatingGender>('woman'); // default
    const [showExample, setShowExample] = useState(false);
    const [searchDetails, setSearchDetails] = useState<{ name: string; age: string; location: string }>({
        name: '',
        age: '',
        location: '',
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedGender = sessionStorage.getItem('pf_dating_gender');
            setGender(normalizeDatingGender(savedGender));
            const savedSearch = sessionStorage.getItem('pf_dating_search');
            if (savedSearch) {
                try {
                    setSearchDetails(JSON.parse(savedSearch));
                } catch {
                    setSearchDetails({ name: '', age: '', location: '' });
                }
            }
        }
    }, []);

    const selectedPhotos = datingSamplePhotos[gender];
    const searchedName = searchDetails.name || searchTarget;
    const nameStr = searchedName || (gender === 'man' ? 'Alex' : 'Emma');
    const searchedAge = searchDetails.age ? `${searchDetails.age} years old` : null;
    const searchedLocation = searchDetails.location || 'Paris, France';

    const profiles = [
        { age: 24, distance: '4 km', match: 88, img: selectedPhotos[1], example: true },
        { age: 27, distance: '2 km', match: 91, img: selectedPhotos[0] },
        { age: 23, distance: '5 km', match: 86, img: selectedPhotos[2] },
        { age: 26, distance: '3 km', match: 90, img: selectedPhotos[3] },
        { age: 25, distance: '1 km', match: 84, img: selectedPhotos[4] },
    ];

    return (
        <div style={{
            background: 'transparent',
            position: 'relative',
            width: '100%',
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #fff7fb 0%, #ffffff 72%)',
                border: '1px solid #ffe1eb',
                borderRadius: '18px',
                padding: '16px',
                marginBottom: '1rem',
                boxShadow: '0 14px 30px rgba(255, 78, 113, 0.08)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
                    <div style={{ minWidth: 0 }}>
                        <div style={{ color: '#ff4e71', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                            Search report ready
                        </div>
                        <h2 style={{ color: '#111827', fontSize: '1.45rem', fontWeight: 900, lineHeight: 1.05, margin: 0 }}>
                            Potential matches for {nameStr}
                        </h2>
                        <p style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.4, margin: '8px 0 0', maxWidth: '260px' }}>
                            {searchedAge ? `${searchedAge} • ` : ''}{searchedLocation} • unlock profile details and activity signals.
                        </p>
                    </div>
                    <div style={{
                        flex: '0 0 auto',
                        minWidth: '88px',
                        background: '#ff4e71',
                        color: 'white',
                        borderRadius: '16px',
                        padding: '10px 12px',
                        textAlign: 'center',
                        boxShadow: '0 10px 24px rgba(255, 78, 113, 0.24)'
                    }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, lineHeight: 1 }}>80%+</div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.04em' }}>match</div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['20+ matches', `${searchedLocation.split(',')[0]} scan`, 'Recently active'].map((label, index) => (
                        <span key={label} style={{
                            background: index === 0 ? '#fff0f5' : '#ffffff',
                            color: index === 0 ? '#ff4e71' : '#374151',
                            border: '1px solid #ffe1eb',
                            borderRadius: '999px',
                            padding: '7px 10px',
                            fontSize: '0.76rem',
                            fontWeight: 800,
                            whiteSpace: 'nowrap'
                        }}>
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Scrollable Container Box */}
            <div style={{
                background: '#ffffff',
                borderRadius: '1rem',
                padding: '1.25rem',
                boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)',
                border: '1px solid #f3f4f6',
                position: 'relative'
            }}>
                <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
                    Potential Matches : {nameStr}<br />
                    <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#4b5563' }}>{searchedLocation}</span>
                </div>

                {/* Horizontal Carousel */}
                <div className="hide-scrollbar" style={{
                    display: 'flex',
                    gap: '12px',
                    overflowX: 'auto',
                    paddingBottom: '8px',
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                }}>
                    {profiles.map((p, idx) => (
                        <button key={idx} type="button" aria-label={p.example ? 'View example result' : 'Locked match preview'} onClick={() => p.example && setShowExample(true)} style={{
                            minWidth: '140px',
                            width: '140px',
                            height: '190px',
                            borderRadius: '12px',
                            position: 'relative',
                            overflow: 'hidden',
                            scrollSnapAlign: 'start',
                            border: '2px solid #ff4e71',
                            flexShrink: 0,
                            cursor: p.example ? 'pointer' : 'default',
                            padding: 0,
                            appearance: 'none'
                        }}>
                            {/* Blurred Image Background */}
                            <div style={{
                                position: 'absolute', inset: -10,
                                backgroundImage: `url(${p.img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center 20%',
                                filter: p.example ? 'none' : 'blur(8px)',
                                zIndex: 1
                            }} />
                            {/* Dark gradient overlay for bottom text readability */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)', zIndex: 2 }} />

                            {/* Match pill top */}
                            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', background: '#ff4e71', color: 'white', padding: '4px 12px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', fontSize: '0.7rem', fontWeight: 700, zIndex: 3, whiteSpace: 'nowrap' }}>
                                {p.example ? 'EXAMPLE' : `${p.match}% Match`}
                            </div>

                            {/* Distance & Info bottom */}
                            <div style={{ position: 'absolute', bottom: '8px', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
                                <div style={{ background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)', color: 'white', padding: '2px 10px', borderRadius: '999px', fontSize: '0.65rem', marginBottom: '4px', fontWeight: 600 }}>
                                    {p.distance} away
                                </div>
                                <div style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, fontStyle: 'italic' }}>
                                    {nameStr}, {p.age}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {showExample && (
                <div
                    onClick={() => setShowExample(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 80,
                        background: 'rgba(15, 23, 42, 0.58)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem'
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: '100%',
                            maxWidth: '360px',
                            background: '#ffffff',
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            boxShadow: '0 30px 80px rgba(15,23,42,0.35)'
                        }}
                    >
                        <div style={{ position: 'relative', height: '260px' }}>
                            <img src={profiles[0].img} alt="Example result" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%' }} />
                            <button
                                type="button"
                                onClick={() => setShowExample(false)}
                                aria-label="Close example"
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '999px',
                                    border: 'none',
                                    background: 'rgba(255,255,255,0.92)',
                                    color: '#111827',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={18} />
                            </button>
                            <div style={{ position: 'absolute', left: '16px', bottom: '16px', right: '16px', color: '#ffffff' }}>
                                <div style={{ display: 'inline-flex', background: '#ff4e71', padding: '5px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px' }}>
                                    Example result
                                </div>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
                                    {nameStr}, 24
                                </h3>
                            </div>
                        </div>
                        <div style={{ padding: '1rem' }}>
                            {[
                                { icon: MapPin, label: 'Last seen near Paris, France' },
                                { icon: Clock, label: 'Recently active dating profile' },
                                { icon: ShieldCheck, label: 'Unlocked report shows full photos, bio and activity signals' }
                            ].map((item) => (
                                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0', borderBottom: '1px solid #f3f4f6' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '999px', background: '#fff1f2', color: '#ff4e71', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <item.icon size={16} />
                                    </div>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1f2937' }}>{item.label}</span>
                                </div>
                            ))}
                            <p style={{ margin: '0.85rem 0 0', fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.5, textAlign: 'center' }}>
                                This is a sample. Your unlocked report will show the real matches found in your scan.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Détaillé Tab UI at bottom of preview */}
            <div style={{ marginTop: '2rem', borderBottom: '2px solid #e5e7eb', display: 'flex' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 16px',
                    borderBottom: '2px solid #ff4e71',
                    marginBottom: '-2px',
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: '#1f2937'
                }}>
                    <Lock size={20} /> detailed
                </div>
            </div>

            <style>{`
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            `}</style>
        </div>
    );
}

export default DatingResultsPreview;
