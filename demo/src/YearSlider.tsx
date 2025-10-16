import * as Slider from '@radix-ui/react-slider';
import styles from './YearSlider.module.css';

interface YearSliderProps {
  minYear: number;
  maxYear: number;
  currentMinYear: number;
  currentMaxYear: number;
  onYearChange: (minYear: number, maxYear: number) => void;
}

export default function YearSlider({ 
  minYear, 
  maxYear, 
  currentMinYear, 
  currentMaxYear, 
  onYearChange
}: YearSliderProps) {
  const handleValueChange = (value: number[]) => {
    if (value.length === 2) {
      onYearChange(value[0], value[1]);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderHeader}>
        <h3>Filter by Construction Year</h3>
        <div className={`${styles.yearRange}`}>
          {currentMinYear} - {currentMaxYear}
        </div>
      </div>
      
      <Slider.Root
        className={styles.sliderRoot}
        value={[currentMinYear, currentMaxYear]}
        onValueChange={handleValueChange}
        min={minYear}
        max={maxYear}
        step={1}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className={styles.sliderTrack}>
          <Slider.Range className={styles.sliderRange} />
        </Slider.Track>
        <Slider.Thumb className={`${styles.sliderThumb} ${styles.sliderThumbMin}`} aria-label="Minimum year" />
        <Slider.Thumb className={`${styles.sliderThumb} ${styles.sliderThumbMax}`} aria-label="Maximum year" />
      </Slider.Root>
      
      <div className={styles.yearLabels}>
        <span>{minYear}</span>
        <span>1825</span>
        <span>1918</span>
        <span>1933</span>
        <span>1960</span>
        <span>2001</span>
        <span>{maxYear}</span>
      </div>
    </div>
  );
}
