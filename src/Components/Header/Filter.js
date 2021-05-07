import { Range } from "react-range";

const Filter = ({ priceRange, setPriceRange }) => {
  const priceMin = 0,
    priceMax = 500;

  return (
    <Range
      step={0.1}
      min={priceMin}
      max={priceMax}
      values={priceRange}
      onChange={(values) => setPriceRange({ values })}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            width: "100%",
            backgroundColor: "#ccc",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "42px",
            width: "42px",
            backgroundColor: "#999",
          }}
        />
      )}
    />
  );
};

export default Filter;
