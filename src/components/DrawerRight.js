import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserStore from '../stores/UserStore'
import { observer } from 'mobx-react'
import clsx from 'clsx'
import drawerStyles from '../styles/drawerStyles'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import MyList from './MyList'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import Submit from './Submit'

function DrawerRight({ search, setSearch }) {
  const classes = drawerStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
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
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            CDC Content
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
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
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          {UserStore.isLoggedIn ? 
            <p>Welcome, {UserStore.username}</p> : 
            <p>Log in or create an account below to save articles to your list!</p>
          }
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="My List"/>
          </ListItem>
          {UserStore.isLoggedIn && <MyList />}
        </List>
        <Divider />
          <List>
            {UserStore.isLoggedIn ?
              <ListItem>
                <ListItemText>
                  <Submit 
                    text={'Log Out'} 
                    color="secondary"
                    disabed={false} 
                    onClick={() => UserStore.logout()}
                  />
                </ListItemText>
              </ListItem> :
            <>
              <ListItem>
                <ListItemText>
                  <Link to="/login">
                    Log In
                   </Link> 
                </ListItemText>
              </ListItem> 
              <ListItem>
                <ListItemText>
                  <Link to="/register">
                    Sign Up
                  </Link> 
                </ListItemText>
              </ListItem>
            </>
          }
          </List> 
      </Drawer>
    </div>
  )
}

export default observer(DrawerRight)