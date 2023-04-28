import {
  AppShell,
  Header,
  Text,
  useMantineTheme,
  MediaQuery,
  Burger,
  Navbar,
  TextInput,
  Code,
  Group,
  Tooltip,
  ActionIcon,
  UnstyledButton,
  Badge,
  createStyles,
  rem
} from '@mantine/core';
import { useState } from 'react';
import { UserButton } from './UserButton';
import { IconPlus, IconSearch, IconSelector, IconBulb, IconUser, IconCheckbox, } from '@tabler/icons-react';
import DarkModeButton from '../DakModeButton';

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {
      borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
      }`,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: 'none',
  },

  collections: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  collectionLink: {
    display: 'block',
    padding: `${rem(8)} ${theme.spacing.xs}`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
}));

const links = [
  { icon: IconBulb, label: 'Activity', notifications: 3 },
  { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
  { icon: IconUser, label: 'Contacts' },
];

const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
];


export default function MainAppShell() {

  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="/"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>{collection.emoji}</span>{' '}
      {collection.label}
    </a>
  ));

  return (
    <AppShell
      layout={opened ? "default" : "alt"}
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={

        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} className={classes.navbar}>
          <Navbar.Section className={classes.section}>
            <UserButton
              image="https://i.imgur.com/fGxgcDF.png"
              name="Bob Rulebreaker"
              email="Product owner"
              icon={<IconSelector size="0.9rem" stroke={1.5} />}
            />
          </Navbar.Section>

          <TextInput
            placeholder="Search"
            size="xs"
            icon={<IconSearch size="0.8rem" stroke={1.5} />}
            rightSectionWidth={70}
            rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            mb="sm"
          />

          <Navbar.Section className={classes.section}>
            <div className={classes.mainLinks}>{mainLinks}</div>
          </Navbar.Section>

          <Navbar.Section className={classes.section}>
            <Group className={classes.collectionsHeader} position="apart">
              <Text size="xs" weight={500} color="dimmed">
                Collections
              </Text>
              <Tooltip label="Create collection" withArrow position="right">
                <ActionIcon variant="default" size={18}>
                  <IconPlus size="0.8rem" stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <div className={classes.collections}>{collectionLinks}</div>
          </Navbar.Section>
        </Navbar>
      }

      header={
        <Header height={{ base: 60 }} p="md">
          <Group position='apart'>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Text>Application header</Text>
          <DarkModeButton />
          </Group>

        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
}
