import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

function MenuListItem(props: { text: string; to: string; disabled?: boolean }) {
  const linkContent = (
    <Link href={props.to} underline="none" component={props.disabled ? 'button' : 'a'} disabled={props.disabled}>
      <Typography variant="subtitle1">{props.text}</Typography>
    </Link>
  );

  return (
    <ListItem disablePadding sx={{ maxWidth: 'fit-content' }}>
      {props.disabled ? (
        <Tooltip title="Leht on valmimisel" sx={{ cursor: 'not-allowed' }}>
          {linkContent}
        </Tooltip>
      ) : (
        linkContent
      )}
    </ListItem>
  );
}

function MenuItems() {
  return (
    <List className="main-nav" component="nav" sx={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
      <MenuListItem text="Esileht" to="/" />
      <MenuListItem text="Hinnakiri" to="hinnakiri" disabled />
      <MenuListItem text="Kontakt" to="kontakt" disabled />
      <MenuListItem text="Broneeri aeg" to="broneeri-aeg" />
    </List>
  );
}

export default MenuItems;
