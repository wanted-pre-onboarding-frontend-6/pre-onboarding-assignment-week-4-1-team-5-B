import { ChangeEvent, useEffect, useState } from 'react';
import { Account } from '../../../types/AccountType';
import { useNavigate } from 'react-router-dom';
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  CardHeader,
} from '@mui/material';

import { useRecoilState, useRecoilValue } from 'recoil';
import useGetSearchQuery from '../../../queries/account/Search';
import { accountsFilterOptionState, searchValueState } from '../../../recoil/account/atoms';
import { filteredAccounts } from '../../../recoil/account/Selectors';
import useGetUsersQuery from '../../../queries/user/Users';
import Loading from '../../../components/loading';

export default function AccountsTable() {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [accountsFilterOption, setAccountsFilterOption] = useRecoilState(accountsFilterOptionState);
  const navigagte = useNavigate();

  const accounts = useRecoilValue(filteredAccounts);
  const searchValue = useRecoilValue(searchValueState);

  const { refetch } = useGetSearchQuery({ params: { q: searchValue } });
  const { data, isLoading } = useGetUsersQuery();
  const paginatedAccounts = applyPagination(accounts, page, limit);

  useEffect(() => {
    refetch();
  }, [searchValue, refetch]);

  if (isLoading) return <Loading />;

  const findUserName = (id: number): string => {
    const userName = data.find((el: { id: number }) => el.id === id).name;
    return userName;
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleOptionChange = (e: { target: { value: string } }): void => {
    let value = 'all';

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setAccountsFilterOption(value);
  };
  const goToUser = (id: number) => {
    navigagte(`/user/${id}`);
  };
  const goToAccount = (id: number) => {
    navigagte(`/account/${id}`);
  };

  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>??????</InputLabel>
              <Select
                onChange={handleOptionChange}
                value={accountsFilterOption}
                label="??????"
                autoWidth
              >
                {Options.map((Option) => (
                  <MenuItem key={Option.id} value={Option.id}>
                    {Option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="?????? ??????"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>?????????</TableCell>
              <TableCell>????????????</TableCell>
              <TableCell>????????????</TableCell>
              <TableCell>????????????</TableCell>
              <TableCell>?????????</TableCell>
              <TableCell>????????????</TableCell>
              <TableCell>????????????</TableCell>
              <TableCell>?????????????????????</TableCell>
              <TableCell>???????????????</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAccounts.map((account) => {
              return (
                <TableRow hover key={account.updated_at}>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell onClick={() => goToUser(account.user_id)} sx={{ cursor: 'pointer' }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {findUserName(account.user_id)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.broker_id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      broker
                    </Typography>
                  </TableCell>
                  <TableCell onClick={() => goToAccount(account.id)} sx={{ cursor: 'pointer' }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      account-number
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      account-name
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{
                        color:
                          account.assets > account.payments
                            ? 'red'
                            : account.assets === account.payments
                            ? 'black'
                            : 'blue',
                      }}
                      gutterBottom
                      noWrap
                    >
                      {account.assets}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      account-assets
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.payments}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      account-payments
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.is_active}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      active
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.created_at}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap></Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={accounts.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
}
const Options = [
  {
    id: 'all',
    name: 'All',
  },
  {
    id: '????????????',
    name: '????????????',
  },
  {
    id: '?????? ?????????',
    name: '?????? ?????????',
  },
  {
    id: '?????? ??????',
    name: '?????? ??????',
  },
  {
    id: '??????',
    name: '??????',
  },
];
const applyPagination = (accounts: Account[], page: number, limit: number): Account[] => {
  return accounts.slice(page * limit, page * limit + limit);
};
