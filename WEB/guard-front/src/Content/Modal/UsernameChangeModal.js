import React, { useState } from 'react';
import './UsernameChangeModal.css'; // 스타일링을 위한 CSS 파일
import axios from 'axios';
const UsernameChangeModal = ({ MACid, isOpen, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

	const submitPW = async () => {
    try {
	    alert(process.env.REACT_APP_SERVER_MAIN+'/user/updatePW');
      const response = await axios.patch('/user/updatePW', {
        macID: MACid,
        nowPW: currentPassword,
        newPW: newPassword,
      });

      if (response.status === 200) {
        alert('Password changed successfully!');
        onClose();
      } else {
        alert('Password change failed.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while changing the password.');
    }
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('New password and confirmation do not match.');
            return;
        }
        submitPW();// 여기에 비밀번호 변경 로직을 추가하세요 (예: API 호출)
        alert('Password changed successfully!');
        onClose();
    };

    if (!isOpen) return null;


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Current Username</label>
                        <input
                            value={currentPassword}
                            onChange={handleCurrentPasswordChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Change Password</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UsernameChangeModal;

