package com.example.cs455020su1jhansenserverjava.services;

import com.example.cs455020su1jhansenserverjava.models.Widget;
// import com.example.cs455020su1jhansenserverjava.repositories.WidgetRepository;
// import org.springframework.beans.factory.annotation.Autowired;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WidgetService {
  // @Autowired
  // WidgetRepository repository;

  List<Widget> widgets = new ArrayList<>();
  {
    widgets.add(new Widget(123, "Widget 1", "heading", "5edec49cea7e7e00170194f2"));
    widgets.add(new Widget(234, "Widget 2", "paragraph", "5edec49cea7e7e00170194f2"));
  }

  public Widget createWidget(Widget newWidget) {
    newWidget.setId(widgets.size() * 20);
    this.widgets.add(newWidget);
    return newWidget;
  }

  public List<Widget> findWidgetsForTopic(String tid) {
    ArrayList<Widget> results = new ArrayList<>();
    for (Widget w : widgets) {
      if (w.getTopicId().equals(tid)) {
        results.add(w);
      }
    }
    return results;
  }

  /*
  public List<Widget> findWidgetsForTopic(String tid) {
    return (List<Widget>)repository.findAll();
        List<Widget> result = new ArrayList<Widget>();

        for (Widget w: widgets) {
            if(w.getTopicId().equals(tid)) {
                result.add(w);
            }
        }

        return result;
  }
  */

  public Widget updateWidget(Integer widgetId, Widget updatedWidget) {
    for(int i=0; i<widgets.size(); i++) {
      if(widgets.get(i).getId().equals(widgetId)) {
        updatedWidget.setId(widgetId);
        widgets.set(i, updatedWidget);
        return updatedWidget;
      }
    }
    return null;
  }

  public List<Widget> deleteWidget(Integer wid) {
    List<Widget> result = new ArrayList<>();
    for (Widget w: widgets) {
      if(!w.getId().equals(wid)) {
        result.add(w);
      }
    }
    this.widgets = result;
    return result;
  }

  public Widget findWidgetById(Integer wid) {
    for (Widget w: widgets) {
      if(w.getId().equals(wid)) {
        return w;
      }
    }
    return null;
  }

  public List<Widget> findAllWidgets() {
    return this.widgets;
  }
}