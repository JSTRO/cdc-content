import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import drawerStyles from '../styles/drawerStyles'
import { useTheme } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MenuIcon from '@material-ui/icons/Menu'
import Search from './Search'
import MyList from './MyList'
import Submit from './Submit'

function DrawerRight({ search, setSearch }) {
  const classes = drawerStyles()
  const theme = useTheme()

  const [open, setOpen] = useState(false)
  const {username, logout, isLoggedIn} = useContext(AuthContext)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="toolbar">
          <Grid container>
            <Grid item sm={3}>
              <Typography variant="h6" noWrap className={classes.title}>
                CDC Content
              </Typography>
            </Grid>
            <Grid item sm={8}>
              <Search search={search} setSearch={setSearch} />
            </Grid>
            <Grid item sm={1}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                className={clsx(open && classes.hide)}
              >
              <MenuIcon className={classes.menuIcon}/>
              </IconButton>
            </Grid>
          </Grid>      
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          {isLoggedIn ? (
            <p>
              Welcome, <strong>{username}</strong>
            </p>
          ) : (
            <p>Log in or sign up below to save articles to your list!</p>
          )}
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="My List" />
          </ListItem>
          {isLoggedIn && <MyList />}
        </List>
        <Divider />
        <List>
          {isLoggedIn ? (
            <ListItem>
              <ListItemText>
                <Submit
                  text={'Log Out'}
                  color="secondary"
                  disabed={false}
                  onClick={() => logout()}
                />
              </ListItemText>
            </ListItem>
          ) : (
            <>
              <ListItem>
                <ListItemText>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="button-block"
                    >
                      Log In
                    </Button>
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="button-block"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </ListItemText>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  )
}

export default DrawerRight