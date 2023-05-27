import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ImageSlider({ images }) {
  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            ml: 1.5,
            position: 'absolute',
            top: '50%',
          }}
        >
          <IconButton
            sx={{
              width: 620,
              display: 'flex',
              justifyContent: 'space-between',
              '&:hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            <ArrowBackIosIcon />
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <Box
          component={'ul'}
          sx={{
            display: 'flex',
            overflow: 'hidden',
            listStyle: 'none',
          }}
          width={600}
          height={600}
        >
          {images.map((image, idx) => {
            return (
              <Box key={idx} component={'li'}>
                <Box component={'img'} src={image} width={300} height={600} />
              </Box>
            );
          })}
        </Box>
        <IconButton />
      </Box>
      <Box
        className="indicator"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {images.map((image, idx) => {
          return (
            <Box
              key={idx}
              sx={{
                width: 10,
                height: 10,
                backgroundColor: 'blue',
                borderRadius: '50%',
                ml: 1,
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
