// --- Seed Users ---
// These represent the persistent accounts in your system
export const seedUsers = [
  { id: 'USR-001', name: 'Alice Mercer',    totalDeposit: 12400.00, totalWithdrawal: 3200.00, rank: 'Gold'     },
  { id: 'USR-002', name: 'Bob Tanaka',      totalDeposit: 8750.50,  totalWithdrawal: 1500.00, rank: 'Silver'   },
  { id: 'USR-003', name: 'Clara Osei',      totalDeposit: 31000.00, totalWithdrawal: 9800.00, rank: 'Platinum' },
  { id: 'USR-004', name: 'David Ruiz',      totalDeposit: 4200.00,  totalWithdrawal: 900.00,  rank: 'Bronze'   },
  { id: 'USR-005', name: 'Eva Lindqvist',   totalDeposit: 17600.00, totalWithdrawal: 5200.00, rank: 'Gold'     },
  { id: 'USR-006', name: 'Frank Mensah',    totalDeposit: 9900.00,  totalWithdrawal: 2100.00, rank: 'Silver'   },
  { id: 'USR-007', name: 'Grace Kim',       totalDeposit: 54000.00, totalWithdrawal: 18000.00,rank: 'Platinum' },
  { id: 'USR-008', name: 'Hiro Nakamura',   totalDeposit: 6300.00,  totalWithdrawal: 700.00,  rank: 'Bronze'   },
  { id: 'USR-009', name: 'Isla Ferreira',   totalDeposit: 22100.00, totalWithdrawal: 8400.00, rank: 'Gold'     },
  { id: 'USR-010', name: 'James Okonkwo',   totalDeposit: 3800.00,  totalWithdrawal: 400.00,  rank: 'Bronze'   },
  { id: 'USR-011', name: 'Karen Sousa',     totalDeposit: 14500.00, totalWithdrawal: 6000.00, rank: 'Silver'   },
  { id: 'USR-012', name: 'Liam Dupont',     totalDeposit: 29800.00, totalWithdrawal: 11200.00,rank: 'Platinum' },
  { id: 'USR-013', name: 'Mia Johansson',   totalDeposit: 7100.00,  totalWithdrawal: 1800.00, rank: 'Silver'   },
  { id: 'USR-014', name: 'Noah Petrov',     totalDeposit: 40200.00, totalWithdrawal: 15600.00,rank: 'Platinum' },
  { id: 'USR-015', name: 'Olivia Tremblay', totalDeposit: 5600.00,  totalWithdrawal: 1100.00, rank: 'Bronze'   },
];

// --- Seed Withdrawals ---
// These are the "Pending" requests that haven't been processed yet
// Added the 'type' field to distinguish between Profit and Principal
export const seedWithdrawals = [
  { 
    id: 'WD-1001', 
    name: 'Grace Kim', 
    address: '0xC3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2', 
    amount: 4200.00, 
    type: 'Profit', 
    createdAt: '2026-02-19T08:05:00Z' 
  },
  { 
    id: 'WD-1002', 
    name: 'James Okonkwo', 
    address: '0xD4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3', 
    amount: 300.00, 
    type: 'Principal', 
    createdAt: '2026-02-19T13:30:00Z' 
  },
  { 
    id: 'WD-1003', 
    name: 'Liam Dupont', 
    address: '0xE5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2E3f4', 
    amount: 6800.00, 
    type: 'Profit', 
    createdAt: '2026-02-19T15:55:00Z' 
  },
  { 
    id: 'WD-1004', 
    name: 'Mia Johansson', 
    address: '0xF6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5', 
    amount: 920.00, 
    type: 'Principal', 
    createdAt: '2026-02-20T07:20:00Z' 
  },
  { 
    id: 'WD-1005', 
    name: 'Noah Petrov', 
    address: '0xA7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2E3f4A5b6', 
    amount: 3100.00, 
    type: 'Profit', 
    createdAt: '2026-02-20T10:10:00Z' 
  },
];