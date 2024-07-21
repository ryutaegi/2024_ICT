import React, { useState } from 'react';
import './PasswordChangeModal.css'; // 스타일링을 위한 CSS 파일
import axios from 'axios';
const UsernameChangeModal = ({username, MACid, isOpen, onClose }) => {
    const [newUsername, setNewUsername] = useState(username);

    const handleNewUsername = (e) => setNewUsername(e.target.value);

	const submitUsername = async () => {
    try {
	    alert(process.env.REACT_APP_SERVER_MAIN+'/user/updatePW');
      const response = await axios.patch('/user/updateUsername', {
        macID: MACid,
        newUsername: newUsername,
      });

      if (response.status === 200) {
        alert('Username changed successfully!');
      } else {
        alert('Username change failed.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while changing the Username.');
    }
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitUsername();// 여기에 비밀번호 변경 로직을 추가하세요 (예: API 호출)
        onClose();
    };

    if (!isOpen) return null;


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Change Username</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>New Username</label>
                        <input
                            value={newUsername}
                            onChange={handleNewUsername}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Change Username</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UsernameChangeModal;

