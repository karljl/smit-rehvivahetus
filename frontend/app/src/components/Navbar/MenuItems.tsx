import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function MenuListItem(props: { text: string; to: string }) {
  return (
    <ListItem disablePadding sx={{ maxWidth: 'fit-content' }}>
      <Link href={props.to} underline="none" component="a">
        <Typography variant="subtitle1">{props.text}</Typography>
      </Link>
    </ListItem>
  );
}

function MenuItems(props: { column?: boolean }) {
  return (
    <List
      className="main-nav"
      component="nav"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: props.column ? 'column' : 'row',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <MenuListItem text="Esileht" to="/" />
      <MenuListItem text="Broneeri aeg" to="broneeri-aeg" />
    </List>
  );
}

export default MenuItems;
