import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const ExportMembersTile = () => {
  const navigate = useNavigate();

  const handleExport = async () => {
    try {
      const stored = localStorage.getItem('businessOwner');
      const owner = stored ? JSON.parse(stored) : null;
      const ownerMobile = owner?.mobile;

      if (!ownerMobile) {
        alert('Not logged in');
        return;
      }

      const res = await fetch(
        `https://backend-3iv8.onrender.com/api/members?ownerMobile=${ownerMobile}`
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error fetching members:', errorText);
        alert('Failed to fetch members.');
        return;
      }

      const allMembers = await res.json();

      if (!Array.isArray(allMembers)) {
        console.error('Expected an array but got:', allMembers);
        alert('Invalid response from server.');
        return;
      }

      const currentMonth = dayjs().month();
      const currentYear = dayjs().year();

      const filtered = allMembers.filter((member) => {
        const joined = dayjs(member.dateJoined);
        return (
          member.ownerMobile === ownerMobile &&
          joined.month() === currentMonth &&
          joined.year() === currentYear
        );
      });

      const calculateEndDate = (startDate, plan) => {
        let daysToAdd = 0;
        if (plan.includes('day')) {
          daysToAdd = parseInt(plan);
        } else if (plan.includes('month')) {
          daysToAdd = parseInt(plan) * 30;
        }
        return dayjs(startDate).add(daysToAdd, 'day').format('DD/MM/YYYY');
      };

      let totalPaid = 0;

      const bodyData = filtered.map((m) => {
        totalPaid += Number(m.moneyPaid);
        return [
          m.fullName,
          m.mobile,
          dayjs(m.dateJoined).format('DD/MM/YYYY'),
          m.planValidity,
          calculateEndDate(m.dateJoined, m.planValidity),
          `₹${m.moneyPaid}`,
        ];
      });

      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(`Members Registered - ${dayjs().format('MMMM YYYY')}`, 14, 20);

      autoTable(doc, {
        head: [['Full Name', 'Mobile', 'Date Joined', 'Validity', 'Plan Ends', 'Money Paid']],
        body: bodyData,
        startY: 30,
        styles: {
          fontSize: 10,
        },
        headStyles: {
          fillColor: [8, 60, 160],
        },
      });

      doc.setFontSize(12);
      doc.text(`Total Money Paid: ₹${totalPaid}`, 14, doc.lastAutoTable.finalY + 10);

      doc.save('members-report.pdf');
    } catch (err) {
      console.error(err);
      alert('Failed to export PDF');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '12px', padding: '10px', flexWrap: 'wrap' }}>
      <button
        onClick={handleExport}
        style={{
          flex: '1 1 45%',
          background: 'linear-gradient(180deg, #1E1B2E, #2A0A3C)',
          color: '#fff',
          padding: '20px',
          borderRadius: '12px',
          border: 'none',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        📄 Export Members
      </button>

      <button
        onClick={() => navigate('/expiredmembers')}
        style={{
          flex: '1 1 45%',
          background: 'linear-gradient(135deg, #2D033B, #4B0082)', 
          color: '#fff',
          padding: '20px',
          borderRadius: '12px',
          border: 'none',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
         📋Expired Members
      </button>
    </div>
  );
};

export default ExportMembersTile;