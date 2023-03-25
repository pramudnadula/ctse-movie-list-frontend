import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import UserDetails from '../UserDetails/UserDetails';
import UserList from '../UserList/UserList';

function Users() {
  const [isAdmin, setIsAdmin] = useState(true);

  const handleSetAdmin = async () => {
    try {
      const admin = (await AsyncStorage.getItem('isAdmin') === 'true');
      setIsAdmin(admin);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleSetAdmin();
  }, []);
  return (
    <>
      {
        (isAdmin) ? (
          <UserList />
        ) : (
          <UserDetails />
        )
      }
    </>
  )
}

export default Users;