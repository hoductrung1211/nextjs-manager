import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

export const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    padding: 12px;
    font-family: 'Poppins', sans-serif;;
    border-radius: 4px 4px 0 4px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? '#16a085' : grey[400]};

    &:hover {
      border-color: ${grey[600]};
    }

    &:focus {
      outline: 0;
      border: 2px solid #16a085;
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );
