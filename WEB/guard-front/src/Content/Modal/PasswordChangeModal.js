import React, { useState } from 'react';
import './PasswordChangeModal.css'; // 스타일링을 위한 CSS 파일

const PasswordChangeModal = ({ isOpen, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('New password and confirmation do not match.');
            return;
        }
        // 여기에 비밀번호 변경 로직을 추가하세요 (예: API 호출)
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
                        <label>Current Password</label>
                        <input
                            type="password"
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

export default PasswordChangeModal;

