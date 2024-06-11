
import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import type {ThunkDispatch} from "@reduxjs/toolkit";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';


import UsersTableHead from './usersTableHead';
import type { UserData, Order } from './interface';
import { stableSort, getComparator } from './utils';
import type { RootState } from '../../app/store'
import {fetchUsersAsync, allUsers, deleteUser, updateUser} from '../../features/users/usersSlice';
import GetLocationsDropDown from './userLocations';
import EnhancedTableToolbar from './tableToolbar';

export default function UsersTable() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof UserData>("name");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const rows = useSelector((state: RootState) => {
        return state.user.users;
      });
    const usersStatus = useSelector((state: RootState) => state.user.status);

    React.useEffect(() => {
        if (usersStatus === 'idle') {
          dispatch(fetchUsersAsync());
        }
      }, []);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof UserData
      ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelected = rows?.map((n) => n.id);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
    () =>
        {
            if(rows ) {
                return stableSort(rows, getComparator(order, orderBy)).slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                    )
            }else {
                return rows;
            }
        }
        ,
    [order, orderBy, page, rowsPerPage, rows, usersStatus, dispatch]
    );

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const deleteBtnClick = () => {
        if(selected && selected.length) {
            selected.forEach(async (rowId, i) => {
                dispatch(deleteUser({id: rowId}));
            })
            setSelected([]);
        }
    }

    const cancelUpdate = (userId: string) => {
        const newSelected = selected.filter((id) => id !== userId);
        setSelected(newSelected);
    }

    const updateLocation = async (userId: string, location: string) => {
        dispatch(updateUser({id: userId, location }));
        cancelUpdate(userId);
    }

    return (
        <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Stack direction="row" spacing={2} sx={{pb: 2}}>
                <Button 
                    variant="outlined" 
                    startIcon={<DeleteIcon />}
                    onClick={deleteBtnClick}
                    disabled={selected && selected.length ? false : true}
                >
                    Delete
                </Button>
            </Stack>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
                <UsersTableHead 
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows? rows.length: 0}
                />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        onClick={(event) => handleClick(event, row.id)}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.hobby}</TableCell>
                    <TableCell align="left">{row.createdAt}</TableCell>
                    <TableCell align="left">
                        {
                            isItemSelected ? <GetLocationsDropDown userId={row.id} updateLocation={updateLocation} cancelUpdate={cancelUpdate} /> : row.location 
                        }
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[20, 30, 40, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
          <EnhancedTableToolbar />  
        </Paper>
        </Box>
    );
}
