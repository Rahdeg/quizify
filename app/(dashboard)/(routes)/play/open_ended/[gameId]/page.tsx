import getGames from '@/actions/get-game';
import { getAuthSession } from '@/lib/next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

interface OpenEndedPageProps{
  params : {gameId : string}
}

const OpenEndedPage = async ({params :{gameId}}:OpenEndedPageProps) => {
      const session = await getAuthSession();
      if (!session?.user) {
        return redirect("/")
      }
    
      const game = await getGames(gameId);
      if (!game || game.gameType !== "open_ended") {
        return redirect("/quiz")
      }

  return (
    <div>
        {gameId}
    </div>
  )
}

export default OpenEndedPage