import { Range, getTrackBackground } from "react-range";

const Filter = ({ priceRange, setPriceRange }) => {
  const priceMin = 0,
    priceMax = 1000;

  return (
    <div className="rangePrice">
      <div class="text-range">Prix entre : </div>
      <div className="range">
        <Range
          step={50}
          min={priceMin}
          max={priceMax}
          values={priceRange}
          onChange={(values) => setPriceRange(values)}
          renderTrack={({ props, children }) => (
            <div
              style={{
                ...props.style,
                height: "auto",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: priceRange,
                    colors: ["#ccc", " #2cb1ba", "#ccc"],
                    min: priceMin,
                    max: priceMax,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "15px",
                width: "15px",
                borderRadius: "50%",
                border: isDragged ? "" : "1px solid white",
                backgroundColor: "#2cb1ba",
                outline: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-25px",
                  color: "#fff",
                  fontSize: "12px",
                  fontFamily: "Maison Neue",
                  padding: "4px",
                  borderRadius: "4px",
                  backgroundColor: "#2cb1ba",
                }}
              >
                {priceRange[index]}€
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Filter;
