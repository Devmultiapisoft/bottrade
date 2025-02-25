import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background-color: #34495e;
  color: white;
  padding: 0.5rem;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 0.5rem;
`;

const UserTable = () => {
  const userData = [
    { id: 1, code: '32C', info: 'None', dimensions: '2.5x3.5x4' },
    { id: 2, code: '45D', info: 'Pending', dimensions: '3x4x5' },
  ];

  return (
    <Table>
      <thead>
        <tr>
          <Th>User Code</Th>
          <Th>User Info</Th>
          <Th>Dimensions</Th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => (
          <tr key={user.id}>
            <Td>{user.code}</Td>
            <Td>{user.info}</Td>
            <Td>{user.dimensions}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;