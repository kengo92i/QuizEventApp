package opt.noukai.actors

import akka.actor.Actor
import opt.noukai.AnyTap

class CorrectAnswers(map: Map[Int, Int]) extends Actor {

  import CorrectAnswers._

  def receive = {
    case QueryAnswers(ids, nums) => (for {
      (id, num) <- ids zip nums
      ans <- map get id
    } yield
      ans == num
      ) |> (sender ! ResultAnswers(_))
    
    case QueryAnswersEachQuestion(ids, nums, qnum) => (for {
      (id, num) <- ids zip nums
      ans <- map get id
    } yield
      ans == num && id == qnum
      ) |> (sender ! ResultAnswers(_))

    case QueryCorrect(ids) => (for {
      id <- ids
      ans <- map get id
    } yield
      ans
      ) |> (sender ! ResultCorrect(_))
  }
}

object CorrectAnswers {
  case class QueryCorrect(answerIds: Seq[Int])
  case class ResultCorrect(correctAnswers: Seq[Int])
  case class QueryAnswers(answerIds: Seq[Int], AnswerNums: Seq[Int])
  case class QueryAnswersEachQuestion(answerIds: Seq[Int], AnswerNums: Seq[Int], questionId: Int)
  case class ResultAnswers(result: Seq[Boolean])
}
