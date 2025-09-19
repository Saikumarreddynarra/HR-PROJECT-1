import React, { useState } from 'react';
import ApplicationService from '../services/ApplicationService';

const ApplyJobButton = ({ jobId, candidateId, onApplied }) => {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setLoading(true);
    ApplicationService.applyForJob(candidateId, jobId)
      .then(res => {
        setApplied(true);
        setLoading(false);
        if (onApplied) onApplied(res.data); // optional callback
        alert('Applied successfully!');
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        alert('Error applying for job.');
      });
  };

  return (
    <button
      className="btn btn-success"
      onClick={handleApply}
      disabled={loading || applied}
    >
      {applied ? 'Applied' : loading ? 'Applying...' : 'Apply'}
    </button>
  );
};

export default ApplyJobButton;
