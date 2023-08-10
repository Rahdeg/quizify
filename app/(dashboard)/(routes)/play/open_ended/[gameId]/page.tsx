import getGames from '@/actions/get-game';
import getOpenGames from '@/actions/get-game-withanswer';
import { getAuthSession } from '@/lib/next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import OpenEnded from './components/open-ended';

interface OpenEndedPageProps{
  params : {gameId : string}
}

const OpenEndedPage = async ({params :{gameId}}:OpenEndedPageProps) => {
      const session = await getAuthSession();
      if (!session?.user) {
        return redirect("/")
      }
    
      const game = await getOpenGames(gameId);
      if (!game || game.gameType !== "open_ended") {
        return redirect("/quiz")
      }

  return <OpenEnded game ={game}/>
}

export default OpenEndedPage