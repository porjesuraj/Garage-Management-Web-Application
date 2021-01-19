package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "question")
@JsonInclude(value = Include.NON_DEFAULT)
public class Question {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("question_id")
	private int question_id;

	@Column(length = 100)
	@JsonProperty("question")
	private String question_message;

	/* ============================== Constructor ============================== */
	public Question() {
		super();
	}

	public Question(int question_id, String question_message) {
		super();
		this.question_id = question_id;
		this.question_message = question_message;
	}

	/* =========================== Getters & Setters =========================== */
	public int getQuestionId() {
		return question_id;
	}

	public void setQuestionId(int question_id) {
		this.question_id = question_id;
	}

	public String getQuestionMessage() {
		return question_message;
	}

	public void setQuestionMessage(String question_message) {
		this.question_message = question_message;
	}

	/* ================================ toString =============================== */
	@Override
	public String toString() {
		return "question [question_id=" + question_id + ", question_message=" + question_message + "]";
	}

}
