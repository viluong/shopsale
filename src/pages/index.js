import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../components/UI/ProTip/ProTip';
import Link from '../components/UI/Link/Link';
import Copyright from '../components/UI/Copyright/Copyright';
import withErrorHandler from '../hocs/withErrorHandler/withErrorHandler';

const home = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
      </Box>
    </Container>
  );
}

export default withErrorHandler(home);