import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, push, onValue, set } from 'firebase/database';

export default function MatchScheduler() {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({
    sport: '',
    team1: '',
    team2: '',
    place: '',
    time: '',
    date: '',
    status: 'akan datang',
    score1: '',
    score2: ''
  });

  useEffect(() => {
    const matchRef = ref(db, 'matches');
    onValue(matchRef, snapshot => {
      const data = snapshot.val();
      const loaded = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
      setMatches(loaded);
    });
  }, []);

  const handleAddMatch = () => {
    const matchRef = ref(db, 'matches');
    push(matchRef, newMatch);
    setNewMatch({ sport: '', team1: '', team2: '', place: '', time: '', date: '', status: 'akan datang', score1: '', score2: '' });
  };

  const handleStatusFilter = (status) => {
    return matches.filter(match => match.status === status);
  };

  const updateScore = (id, score1, score2) => {
    const scoreRef = ref(db, `matches/${id}`);
    set(scoreRef, { ...matches.find(m => m.id === id), score1, score2 });
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Tambah Perlawanan</h2>
        <input placeholder="Jenis Sukan" value={newMatch.sport} onChange={e => setNewMatch({ ...newMatch, sport: e.target.value })} />
        <input placeholder="Pasukan 1" value={newMatch.team1} onChange={e => setNewMatch({ ...newMatch, team1: e.target.value })} />
        <input placeholder="Pasukan 2" value={newMatch.team2} onChange={e => setNewMatch({ ...newMatch, team2: e.target.value })} />
        <input placeholder="Tempat" value={newMatch.place} onChange={e => setNewMatch({ ...newMatch, place: e.target.value })} />
        <input type="date" value={newMatch.date} onChange={e => setNewMatch({ ...newMatch, date: e.target.value })} />
        <input type="time" value={newMatch.time} onChange={e => setNewMatch({ ...newMatch, time: e.target.value })} />
        <button onClick={handleAddMatch}>Tambah</button>
      </div>

      <div className="mb-4">
        <button onClick={() => setMatches(handleStatusFilter('akan datang'))}>Akan Datang</button>
        <button onClick={() => setMatches(handleStatusFilter('sedang berlangsung'))}>Sedang Berlangsung</button>
        <button onClick={() => setMatches(handleStatusFilter('selesai'))}>Selesai</button>
      </div>

      <div>
        {matches.map(match => (
          <div key={match.id} className="border p-2 mb-2">
            <strong>{match.sport}</strong> - {match.team1} vs {match.team2} ({match.status})
            <br />Tarikh: {match.date} @ {match.time} di {match.place}
            {match.status === 'sedang berlangsung' && (
              <div>
                <input placeholder="Skor 1" value={match.score1} onChange={e => updateScore(match.id, e.target.value, match.score2)} />
                <input placeholder="Skor 2" value={match.score2} onChange={e => updateScore(match.id, match.score1, e.target.value)} />
              </div>
            )}
            {match.status === 'selesai' && <div>Skor: {match.score1} - {match.score2}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}