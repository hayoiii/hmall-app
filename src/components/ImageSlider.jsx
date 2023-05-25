import { Box, IconButton } from '@mui/material';

export default function ImageSlider({ images }) {
  return (
    <Box>
      <Box>
        <IconButton></IconButton>
        <Box
          component={'ul'}
          sx={{ display: 'flex', overflow: 'hidden' }}
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
      <Box className="indicator">
        {images.map((image, idx) => {
          return (
            <Box
              key={idx}
              sx={{ width: 10, height: 10, backgroundColor: 'blue' }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
