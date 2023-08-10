import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import React, { memo } from 'react';

const CustomersTableRowBase = (props) => {
  const { id, address, avatar, createdAt, name, email, isSelected, phone, onSelectOne, onDeselectOne } = props;
  return (
    <TableRow hover key={id} selected={isSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected}
          onChange={(event) => {
            if (event.target.checked) {
              console.log(id);
              onSelectOne?.(id);
            } else {
              onDeselectOne?.(id);
            }
          }}
        />
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Avatar src={avatar}>{getInitials(name)}</Avatar>
          <Typography variant="subtitle2">{name}</Typography>
        </Stack>
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{createdAt}</TableCell>
    </TableRow>
  );
};
const CustomersTableRow = memo(CustomersTableRowBase);

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Signed Up</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((customer) => {
              const isSelected = selected.includes(customer.id);
              const createdAt = format(new Date(customer.createdAt), 'dd/MM/yyyy');
              return (
                <CustomersTableRow
                  key={customer.id}
                  id={customer.id}
                  avatar={customer.avatar}
                  name={customer.name}
                  email={customer.email}
                  address={customer.address}
                  phone={customer.phone}
                  isSelected={isSelected}
                  createdAt={createdAt}
                  onDeselectOne={onDeselectOne}
                  onSelectOne={onSelectOne}
                />
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
