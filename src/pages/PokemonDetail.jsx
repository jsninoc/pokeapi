import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import Loader from '../components/Loader';
import useFavorites from '../hooks/useFavorites';

const PokemonDetail = () => {

  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { favorites, updateFavorites } = useFavorites();

  const getPokemonDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(data.data);
      
      let statsArray = [];
      data.data.stats.forEach(stat => {
        const obj = {
          name: stat.stat.name.split("-").join(" ")[0].toUpperCase() + stat.stat.name.split("-").join(" ").substring(1),
          base_stat: stat.base_stat
        }
        statsArray.push(obj);
      });
      setStats(statsArray);
    } catch (error) {
      setPokemon();
      setStats();
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getPokemonDetail();

    return () => {
      setPokemon()
      setStats();
    }
  }, [getPokemonDetail]);

  useEffect(() => {
    if(pokemon && stats) {
      const chartRoot = am5.Root.new("chartdiv");
      chartRoot.setThemes([am5themes_Animated.new(chartRoot)]);

      const chart = chartRoot.container.children.push(am5radar.RadarChart.new(chartRoot, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX"
      }));

      const cursor = chart.set("cursor", am5radar.RadarCursor.new(chartRoot, {
        behavior: "zoomX"
      }));

      cursor.lineY.set("visible", false);

      const xRenderer = am5radar.AxisRendererCircular.new(chartRoot, {});
      xRenderer.labels.template.setAll({
        radius: 10
      });

      const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(chartRoot, {
        maxDeviation: 0,
        categoryField: "name",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(chartRoot, {})
      }));

      const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(chartRoot, {
        renderer: am5radar.AxisRendererRadial.new(chartRoot, {})
      }));

      const series = chart.series.push(am5radar.RadarLineSeries.new(chartRoot, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "base_stat",
        categoryXField: "name",
        tooltip:am5.Tooltip.new(chartRoot, {
          labelText:"{valueY}"
        })
      }));
    
      series.strokes.template.setAll({
        strokeWidth: 2
      });
      
      series.bullets.push(function () {
        return am5.Bullet.new(chartRoot, {
          sprite: am5.Circle.new(chartRoot, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });

      xAxis.data.setAll(stats);
      series.data.setAll(stats);

      return () => {
        chartRoot.dispose();
      }
    }
  }, [pokemon, stats]);

  const addFavorite = () => {
    const obj = {
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.sprites.front_default
    }

    updateFavorites(obj);
  }
 
  return (
    <div className='flex flex-col items-center py-6 w-11/12 relative'>
      { !isLoading && pokemon ? (
        <>
          <h1 className='text-3xl text-center text-primary-blue capitalize'>{ pokemon.name }</h1>
          <h2 className='text-2xl text-center text-primary-blue mb-4'># { pokemon.id }</h2>

          <div className='flex items-center justify-center w-full mb-4'>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <img src={pokemon.sprites.back_default} alt={pokemon.name} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:w-full'>
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl text-center text-primary-blue mb-2'>Types</h2>
              <div className='flex items-center flex-wrap gap-4'>
                {pokemon.types.map(type => (
                  <p className='text-secondary-yellow text-lg text-center capitalize' key={ type.slot }>{ type.type.name }</p>
                ))}
              </div>
            </div>
            
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl text-center text-primary-blue mb-2'>Abilities</h2>
              <div className='flex items-center flex-wrap gap-4'>
                {pokemon.abilities.map(ability => (
                  <p className='text-secondary-yellow text-lg text-center capitalize' key={ ability.slot }>{ ability.ability.name.split("-").join(" ") }</p>
                ))}
              </div>
            </div>
          </div>


          <h2 className='text-2xl text-center text-primary-blue mt-4'>Stats</h2>
          <div id='chartdiv' className='w-full h-[30vh] md:w-1/2 md:h-[40vh]'></div>

          <button className='fixed bottom-12 right-4 bg-primary-yellow w-12 h-12 box-border rounded-full flex flex-col items-center justify-center' onClick={ addFavorite }>
            <FontAwesomeIcon icon={ favorites.filter(favorite => favorite.id === pokemon.id).length > 0 ? faHeart : faHeartRegular } className="text-primary-blue text-2xl" />
          </button>
        </>
      )
      : isLoading && !pokemon ? (
        <Loader />
      )

      : !isLoading && !pokemon && (
        <>
          <h1 className='text-center text-2xl text-primary-blue'>Oops...</h1>
          <h2 className='text-center text-xl text-primary-blue'>There is no pokemon with that name</h2>
        </>
      )
      }
    </div>
  );
};

export default PokemonDetail;