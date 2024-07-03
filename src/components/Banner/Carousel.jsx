import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";
import { useState } from "react";
import { useEffect } from "react";
import AliceCarousel, { Link } from "react-alice-carousel";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

export function numberWithCommas(x, currency = "USD") {
  switch (currency) {
    case "USD":
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // break;
    case "IDR":
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    default:
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const classes = useStyles();

  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };

  console.log(trending);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        className={classes.carouselItem}
        to={`/coins/${coin.id}`}
        key={coin.id}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span
          style={{ fontSize: 22, fontWeight: 500, textTransform: "capitalize" }}
        >
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2), currency)}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
