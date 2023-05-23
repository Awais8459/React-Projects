import "./view.css";
import React from 'react'

function View(props) {
    const { Title, Plot, Poster, Released, Genre,Director, Actors, Language, Awards } = props.movie;
  return (
    <article className="flex bg-white transition hover:shadow-xl">
      <div className="rotate-180 p-2 vertical-text">
        <time
          datetime="2022-10-10"
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
        >
          <span>Released</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>{Released}</span>
        </time>
      </div>

      <div className="hidden sm:block sm:basis-56">
        <img
          alt="Movie Poster"
          src={Poster}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a href="#">
            <h3 className="font-bold uppercase text-gray-900">
            {Title}
            </h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
          {Plot}
          </p>
          <hr/>
          {Genre}
          <hr/>
          {Director}
          <hr/>
          {Actors}
          <hr/>
          {Language}
          <hr/>
          {Awards}
          <hr/>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
        </div>
      </div>
    </article>
  );
};

export default View;