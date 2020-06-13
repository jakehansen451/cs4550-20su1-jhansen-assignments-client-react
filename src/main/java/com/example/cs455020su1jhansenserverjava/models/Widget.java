package com.example.cs455020su1jhansenserverjava.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

// import javax.persistence.*;

// @Entity
// @Table(name="widgets")
public class Widget implements Comparable<Widget> {
  // @Id
  // @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String tid;
  private String name;
  private String type;
  private int widgetOrder;
  private String text;
  private String contentRef;
  private int contentSize;
  private int contentWidth;
  private int contentHeight;
  private String cssClass;
  private String style;
  private String value;

  /*
  @ManyToOne
  @JsonIgnore
  private Topic topic;

  public Topic getTopic() {
    return topic;
  }

  public void setTopic(Topic topic) {
    this.topic = topic;
  }
  */

  public Widget() {
  }

  public Widget(Integer id, String name, String type, String tid, int widgetOrder) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.tid = tid;
    this.widgetOrder = widgetOrder;
  }

  @JsonProperty("_id")
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getTopicId() {
    return tid;
  }

  public void setTopicId(String tid) {
    this.tid = tid;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  // @JsonIgnore
  public int getWidgetOrder() {
    return widgetOrder;
  }

  public void setWidgetOrder(int widgetOrder) {
    this.widgetOrder = widgetOrder;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }


  public String getContentRef() {
    return contentRef;
  }

  public void setContentRef(String contentRef) {
    this.contentRef = contentRef;
  }

  public int getContentSize() {
    return contentSize;
  }

  public void setContentSize(int contentSize) {
    this.contentSize = contentSize;
  }

  public int getContentWidth() {
    return contentWidth;
  }

  public void setContentWidth(int contentWidth) {
    this.contentWidth = contentWidth;
  }

  public int getContentHeight() {
    return contentHeight;
  }

  public void setContentHeight(int contentHeight) {
    this.contentHeight = contentHeight;
  }

  public String getCssClass() {
    return cssClass;
  }

  public void setCssClass(String cssClass) {
    this.cssClass = cssClass;
  }

  public String getStyle() {
    return style;
  }

  public void setStyle(String style) {
    this.style = style;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  @Override
  public int compareTo(Widget o) {
    return this.getWidgetOrder() - o.getWidgetOrder();
  }
}