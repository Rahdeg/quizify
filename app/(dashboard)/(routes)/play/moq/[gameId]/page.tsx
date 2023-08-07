import getGames from '@/actions/get-game';
import { getAuthSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import Moq from './components/moq';

interface MoqPageProps{
  params : {gameId : string}
}

const MoqPage = async ({params:{gameId}}:MoqPageProps) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/")
  }

  const game = await getGames(gameId);
  if (!game || game.gameType !== "moq") {
    return redirect("/quiz")
  }

  return <Moq game={game}/>
  
}

export default MoqPage