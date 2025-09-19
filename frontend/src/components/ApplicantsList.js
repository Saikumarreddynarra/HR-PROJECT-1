import React, { useEffect, useState } from 'react';
import ApplicationService from '../services/ApplicationService';

const ApplicantsList = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    ApplicationService.getApplicantsForJob(jobId)
      .then(res => setApplicants(res.data))
      .catch(err => console.error('Error fetching applicants:', err));
  }, [jobId]);

  if (!applicants.length) return <p>No applicants yet.</p>;

  return (
    <div>
      <h5>Applicants:</h5>
      <ul className="list-group">
        {applicants.map(a => (
          <li key={a.id} className="list-group-item">
            {a.name} ({a.email}) - {a.phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicantsList;
