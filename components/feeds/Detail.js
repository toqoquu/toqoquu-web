import React, { useState } from 'react';
import { useMount } from 'react-use';
import Link from 'next/link'
import MaterialIcon from '@material/react-material-icon'
import Card from './Card'
import  * as api from '../../lib/api'
import classnames from 'classnames'

export default function feedDetail({ data }) {
  const { deskripsi, setDescription } = useState()
  return (
    <div className="grid grid-cols-2 gap-10">
      <div>
        <Card
          href={'/feeds/' + data?.id }
          className="h-full"
          id={data?.id}
          image={data?.url || "https://via.placeholder.com/430.png/f0f0f0/000"}
        />
      </div>
      <div>
        <div className="flex items-center mb-8">
          <div className="mr-3">
            <img src={data?.foto || "https://via.placeholder.com/180.png/f0f0f0/000"} className="object-cover rounded-full w-24 h-24" />
          </div>
          <div>
            <h3 className="text-lg mb-2">{data?.name}</h3>
            <p className="text-sm">{data?.deskripsi}</p>
          </div>
        </div>
        <div>
          <div className="h-64 overflow-y-scroll mb-4">
            {data?.list_comment?.map((o, n) => (
              <div key={n} className={classnames({
                'flex items-center border-b pb-4': true,
                'mb-4': n < data?.list_comment?.length,
                }
              )}>
                <div className="mr-3">
                  <img src={o?.url || '"https://via.placeholder.com/100.png/f0f0f0/000"'} className="w-20 h-20 object-cover rounded-full" />
                </div>
                <div>
                  <p className="mb-1 font-medium">{o?.name}</p>
                  <p className="text-sm">{o?.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex items-center">
            <div className="w-full">
              <input
                type="text"
                value={deskripsi}
                className="w-full outline-none h-12"
                placeholder="Write your comment here"
                onInput={(event) => setDescription(event.target.value)}
              />
            </div>
            <div>
              <button
                className={classnames({
                  'bg-yellow-200 rounded flex h-10 w-10 justify-center items-center': true,
                  'opacity-25': true,
                })}
              >
                <MaterialIcon icon="play_arrow" className="text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
