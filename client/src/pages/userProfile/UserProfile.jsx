import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import LeftSideBar from '../../components/leftSideBar/LeftSideBar';
import Avatar from '../../components/avatar/Avatar';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons"
import moment from 'moment'
import './UserProfile.css'
import ProfileBio from './ProfileBio';
import EditProfileForm from './EditProfileForm';

function UserProfile() {
    const { id } = useParams();
    const [Switch, setSwitch] = useState(false);
    const { users } = useSelector((state) => state.authReducer);
    const currentProfile = users.filter(user => user._id === id)[0];
    const currentUser = useSelector(state => state.authReducer.currentUser)
    return (
        <div className="home-container-1">
            <LeftSideBar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar
                                backgroundColor="purple"
                                color="white"
                                fontSize="50px"
                                px="40px"
                                py="30px"
                            >
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p>
                                    <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                                    {moment(currentProfile?.joinedOn).fromNow()}
                                </p>
                            </div>
                        </div>
                        {currentUser?.result._id === id && (
                            <button
                                type="button"
                                onClick={() => setSwitch(true)}
                                className="edit-profile-btn"
                            >
                                <FontAwesomeIcon icon={faPen} /> Edit Profile
                            </button>
                        )}
                    </div>
                    <>
                        {Switch ? (
                            <EditProfileForm
                                currentUser={currentUser}
                                setSwitch={setSwitch}
                            />
                        ) : (
                            <ProfileBio currentProfile={currentProfile} />
                        )}
                    </>
                </section>
            </div>
        </div>
    );
};

export default UserProfile